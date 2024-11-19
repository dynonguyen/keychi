import { DEFAULT } from '../constants/default';

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

export async function pbkdf2(options: PBKDF2Options) {
  const {
    password,
    salt,
    iterations = DEFAULT.KDF_ITERATIONS,
    hashLength = DEFAULT.KDF_HASH_LENGTH,
    hashAlgorithm = PBKDF2HashAlgorithm.Sha256
  } = options;
  // Encode the password and salt as ArrayBuffers
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);

  // Import the password as a cryptographic key
  const baseKey = await window.crypto.subtle.importKey('raw', passwordBuffer, { name: 'PBKDF2' }, false, [
    'deriveBits',
    'deriveKey'
  ]);

  // Derive bit from the base key
  function deriveBits() {
    return crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: saltBuffer, iterations, hash: { name: hashAlgorithm } },
      baseKey,
      hashLength * 8
    );
  }

  // Derive key from the base key
  function deriveKey() {
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: saltBuffer, iterations, hash: { name: hashAlgorithm } },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  return { baseKey, deriveBits, deriveKey };
}

// Argon2
type Argon2Options = KDFOptions & {
  memory: number;
  parallelism: number;
};

// TODO: Implement the Argon2 function
export async function argon2(_options: Argon2Options): Promise<string> {
  return '';
}

// -----------------------------
const ENCRYPTION_OPTION = {
  IV_LENGTH: 12,
  ALGORITHM: 'AES-GCM'
};

export async function encrypt(plaintext: string, key: CryptoKey): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(plaintext);

  const iv = window.crypto.getRandomValues(new Uint8Array(ENCRYPTION_OPTION.IV_LENGTH));
  const cipherText = await window.crypto.subtle.encrypt({ name: ENCRYPTION_OPTION.ALGORITHM, iv }, key, encodedData);

  const encrypted = new Uint8Array(iv.byteLength + cipherText.byteLength);
  encrypted.set(new Uint8Array(iv), 0);
  encrypted.set(new Uint8Array(cipherText), iv.byteLength);

  return encrypted.buffer;
}

export async function decrypt(encryptedData: ArrayBuffer, key: CryptoKey): Promise<string> {
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
