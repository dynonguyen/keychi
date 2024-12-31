import { DEFAULT } from '@keychi/shared/constants';
import { Any, KdfAlgorithm, KdfParams } from '@keychi/shared/types';
import { match } from 'ts-pattern';
import { getEnv } from './get-env';
import { arrayBufferToHex, hexToArrayBuffer, hexToUint8Array } from './helper';
import { loadWasm } from './load-wasm';

// -----------------------------
type KDFOptions = {
  password: string;
  salt: string;
  hashLength?: number;
  iterations?: number;
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

async function pbkdf2(options: PBKDF2Options): Promise<CryptoKey> {
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

  return derivedKey;
}

// Argon2
type Argon2Options = KDFOptions & {
  memory: number;
  parallelism: number;
};

/**
 * Generates a key derivation function (KDF) result using the Argon2 algorithm.
 *
 * This function loads the necessary WebAssembly module and performs the Argon2 hashing
 * with the provided options.
 *
 * OWASP further notes that the following Argon2id options provide equivalent cryptographic strength and simply trade off memory usage for compute workload:[10]

- Memory: 46 MiB, Iterations: 1, Parallelism: 1
- Memory: 19 MiB, Iterations: 2, Parallelism: 1
- Memory: 12 MiB, Iterations: 3, Parallelism: 1
- Memory: 9 MiB, Iterations: 4, Parallelism: 1
- Memory: 7 MiB, Iterations: 5, Parallelism: 1

 *
 * @param {Argon2Options} options - The options for the Argon2 hashing algorithm.
 * @param {string} options.password - The password to be hashed.
 * @param {Uint8Array} options.salt - The salt to be used in the hashing process.
 * @param {number} options.memory - The memory cost parameter for Argon2.
 * @param {number} options.iterations - The number of iterations for Argon2.
 * @param {number} options.parallelism - The degree of parallelism for Argon2.
 * @param {number} options.hashLength - The desired length of the hash output.
 * @returns {Promise<CryptoKey>} A promise that resolves to the derived key.
 */
async function argon2(options: Argon2Options): Promise<CryptoKey> {
  await loadWasm();
  const { password, salt, memory, iterations, parallelism, hashLength } = options;
  const keyBuffer = (window as Any).argon2Hash(password, salt, iterations, memory, parallelism, hashLength);
  const key = hexToUint8Array(keyBuffer);
  return crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['decrypt', 'encrypt']);
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
  private _encryptionKey: CryptoKey | null = null;

  constructor(private options: CipherOptions) {}

  private async _getEncryptionKey(): Promise<CryptoKey> {
    if (this._encryptionKey) return this._encryptionKey;

    return this._deriveKey();
  }

  private async _cryptoKeyToHex(key: CryptoKey): Promise<string> {
    return crypto.subtle.exportKey('raw', key).then(arrayBufferToHex);
  }

  private async _deriveKey(kdfOptions?: Partial<KdfParams>): Promise<CryptoKey> {
    const { masterPwd, kdfParams } = this.options;
    const { kdfSalt, kdfAlgorithm, kdfIterations } = { ...kdfParams, ...kdfOptions };
    this._encryptionKey = await match(kdfAlgorithm)
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

    return this._encryptionKey;
  }

  async getAuthenticationPwd(): Promise<string> {
    const kdfSalt = this.options.email + getEnv('VITE_AUTH_KDF_SALT');

    return match(this.options.kdfParams.kdfAlgorithm)
      .with(KdfAlgorithm.PBKDF2, async () => {
        return await this._deriveKey({
          kdfAlgorithm: KdfAlgorithm.PBKDF2,
          kdfSalt,
          kdfIterations: 100_000
        }).then(this._cryptoKeyToHex);
      })
      .with(KdfAlgorithm.Argon2, async () => {
        return await this._deriveKey({
          kdfAlgorithm: KdfAlgorithm.Argon2,
          kdfSalt,
          kdfMemory: 64 * 1024,
          kdfIterations: 2,
          kdfParallelism: 1
        }).then(this._cryptoKeyToHex);
      })
      .exhaustive();
  }

  async encrypt(plaintext: string): Promise<string> {
    const encryptionKey = await this._getEncryptionKey();

    return encryptAES(plaintext, encryptionKey).then(arrayBufferToHex);
  }

  async decrypt(encrypted: string | ArrayBuffer): Promise<string> {
    const encryptionKey = await this._getEncryptionKey();

    if (encrypted instanceof ArrayBuffer) {
      return decryptAES(encrypted, encryptionKey);
    }

    return decryptAES(hexToArrayBuffer(encrypted), encryptionKey);
  }
}
