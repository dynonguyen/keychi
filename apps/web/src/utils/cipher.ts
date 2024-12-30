import { DEFAULT } from '@keychi/shared/constants';
import { Any, KdfAlgorithm, KdfParams } from '@keychi/shared/types';
import { match, P } from 'ts-pattern';
import { getEnv } from './get-env';
import { arrayBufferToHex, hexToArrayBuffer } from './helper';
import { loadWasm } from './load-wasm';

// -----------------------------
type KDFOptions = {
  password: string;
  salt: string;
  hashLength?: number;
  iterations?: number;
};

type KDFResult = {
  baseKey: CryptoKey;
  derivedKey: CryptoKey;
};

// PBKDF2
enum PBKDF2HashAlgorithm {
  Sha1 = 'SHA-1',
  Sha256 = 'SHA-256',
  Sha384 = 'SHA-384',
  Sha512 = 'SHA-512'
}

type PBKDF2Options = KDFOptions & {
  hashAlgorithm?: PBKDF2HashAlgorithm;
};

async function pbkdf2(options: PBKDF2Options): Promise<KDFResult> {
  const {
    password,
    salt,
    iterations = DEFAULT.KDF_PBKDF2_ITERATIONS,
    hashAlgorithm = PBKDF2HashAlgorithm.Sha256
  } = options;

  // Encode the password and salt as ArrayBuffers
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);

  // Import the password as a cryptographic key
  const baseKey = await crypto.subtle.importKey('raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveKey']);

  // Derive key from the base key
  const derivedKey = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBuffer, iterations, hash: { name: hashAlgorithm } },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  return { baseKey, derivedKey };
}

// Argon2
type Argon2Options = KDFOptions & {
  memory: number;
  parallelism: number;
};

async function argon2(_options: Argon2Options): Promise<string> {
  await loadWasm();
  const { password, salt, memory, iterations, parallelism, hashLength } = _options;
  return (window as Any).argon2Hash(password, salt, iterations, memory, parallelism, hashLength);
}

// -----------------------------
const ENCRYPTION_OPTION = {
  IV_LENGTH: 12,
  ALGORITHM: 'AES-GCM'
};

async function encryptAES(plaintext: string, key: CryptoKey): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(plaintext);

  const iv = crypto.getRandomValues(new Uint8Array(ENCRYPTION_OPTION.IV_LENGTH));
  const cipherText = await crypto.subtle.encrypt({ name: ENCRYPTION_OPTION.ALGORITHM, iv }, key, encodedData);

  const encrypted = new Uint8Array(iv.byteLength + cipherText.byteLength);
  encrypted.set(new Uint8Array(iv), 0);
  encrypted.set(new Uint8Array(cipherText), iv.byteLength);

  return encrypted.buffer;
}

async function decryptAES(encryptedData: ArrayBuffer, key: CryptoKey): Promise<string> {
  const dataView = new DataView(encryptedData);
  const iv = new Uint8Array(ENCRYPTION_OPTION.IV_LENGTH);
  const encryptedDataWithoutIV = new Uint8Array(encryptedData.byteLength - ENCRYPTION_OPTION.IV_LENGTH);

  encryptedDataWithoutIV.set(new Uint8Array(encryptedData, ENCRYPTION_OPTION.IV_LENGTH));

  for (let i = 0; i < iv.length; i++) {
    iv[i] = dataView.getUint8(i);
  }

  const decryptedData = await crypto.subtle.decrypt(
    { name: ENCRYPTION_OPTION.ALGORITHM, iv: iv },
    key,
    encryptedDataWithoutIV
  );

  return new TextDecoder().decode(decryptedData);
}

// -----------------------------
export type CipherOptions = {
  email: string;
  masterPwd: string;
  kdfParams: KdfParams;
};

export class Cipher {
  private _encryptionKey: CryptoKey | string | null = null;

  constructor(private options: CipherOptions) {}

  private async _getEncryptionKey(): Promise<CryptoKey | string> {
    if (this._encryptionKey) return this._encryptionKey;

    const kdfResult = await this._deriveKey();
    return match(kdfResult)
      .with({ derivedKey: P.any }, (result) => result.derivedKey)
      .with(P.string, (result) => result)
      .exhaustive();
  }

  private async _cryptoKeyToHex(key: CryptoKey): Promise<string> {
    return crypto.subtle.exportKey('raw', key).then(arrayBufferToHex);
  }

  private async _deriveKey(kdfOptions?: Partial<KdfParams>): Promise<KDFResult | string> {
    const { masterPwd, kdfParams } = this.options;
    const { kdfSalt, kdfAlgorithm, kdfIterations } = { ...kdfParams, ...kdfOptions };

    return match(kdfAlgorithm)
      .with(KdfAlgorithm.PBKDF2, async () => {
        return await pbkdf2({
          password: masterPwd,
          salt: kdfSalt,
          iterations: kdfIterations,
          hashAlgorithm: PBKDF2HashAlgorithm.Sha256
        });
      })
      .with(KdfAlgorithm.Argon2, async () => {
        const { kdfMemory, kdfParallelism } = { ...kdfParams, ...kdfOptions };

        return argon2({
          password: masterPwd,
          salt: kdfSalt,
          memory: kdfMemory!,
          iterations: kdfIterations!,
          parallelism: kdfParallelism!,
          hashLength: 32
        });
      })
      .exhaustive();
  }

  async getAuthenticationPwd(): Promise<string> {
    const kdfSalt = this.options.email + getEnv('VITE_AUTH_KDF_SALT');

    return match(this.options.kdfParams.kdfAlgorithm)
      .with(KdfAlgorithm.PBKDF2, async () => {
        return await this._deriveKey({
          kdfAlgorithm: KdfAlgorithm.PBKDF2,
          kdfSalt,
          kdfIterations: 100_000
        }).then((result) => this._cryptoKeyToHex((result as KDFResult).derivedKey));
      })
      .with(KdfAlgorithm.Argon2, async () => {
        return await this._deriveKey({
          kdfAlgorithm: KdfAlgorithm.Argon2,
          kdfSalt,
          kdfMemory: 1024 * 1024,
          kdfParallelism: 2
        }).then((result) => result as string);
      })
      .exhaustive();
  }

  async encrypt(plaintext: string): Promise<string> {
    const encryptionKey = await this._getEncryptionKey();

    const key = await match(encryptionKey)
      .with(P.string, async (key) => {
        const matchResult = key.match(/.{1,2}/g);
        const hashBytes = new Uint8Array((matchResult ?? []).map((byte) => parseInt(byte, 16)));
        return crypto.subtle.importKey('raw', hashBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
      })
      .with(P.instanceOf(CryptoKey), (cryptoKey) => cryptoKey)
      .exhaustive();

    return encryptAES(plaintext, key).then(arrayBufferToHex);
  }

  async decrypt(encrypted: string | ArrayBuffer, encryptionKey: string | CryptoKey): Promise<string> {
    const key = await match(encryptionKey)
      .with(P.string, async (key) => {
        const matchResult = key.match(/.{1,2}/g);
        const hashBytes = new Uint8Array((matchResult ?? []).map((byte) => parseInt(byte, 16)));

        return crypto.subtle.importKey('raw', hashBytes, { name: 'AES-GCM' }, false, ['decrypt']);
      })
      .with(P.instanceOf(CryptoKey), (cryptoKey) => cryptoKey)
      .exhaustive();

    if (encrypted instanceof ArrayBuffer) {
      return decryptAES(encrypted, key);
    }

    return decryptAES(hexToArrayBuffer(encrypted), key);
  }
}
