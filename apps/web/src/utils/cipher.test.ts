import { KdfAlgorithm, KdfParams } from '@keychi/shared/types';
import { beforeEach, describe, expect, it } from 'vitest';
import { Cipher } from './cipher';
describe('Cipher', () => {
  let cipher: Cipher;
  const email = 'test@example.com';
  const masterPwd = 'password123';
  const kdfParams: KdfParams = {
    kdfAlgorithm: KdfAlgorithm.PBKDF2,
    kdfSalt: 'salt123',
    kdfIterations: 100000,
    kdfMemory: 1024 * 1024,
    kdfParallelism: 2
  };

  beforeEach(() => {
    cipher = new Cipher({ email, masterPwd, kdfParams });
  });

  it('should derive the correct authentication password using PBKDF2', async () => {
    const authPwd = await cipher.getAuthenticationPwd();
    expect(authPwd).toBeDefined();
    expect(typeof authPwd).toBe('string');
  });

  it('should encrypt and decrypt a message correctly', async () => {
    const plaintext = 'Hello, World!';
    const encrypted = await cipher.encrypt(plaintext);
    expect(encrypted).toBeDefined();
    expect(typeof encrypted).toBe('string');

    const decrypted = await cipher.decrypt(encrypted, await cipher['_getEncryptionKey']());
    expect(decrypted).toBe(plaintext);
  });

  it('should derive the correct encryption key using PBKDF2', async () => {
    const encryptionKey = await cipher['_getEncryptionKey']();
    expect(encryptionKey).toBeDefined();
    expect(encryptionKey instanceof CryptoKey).toBe(true);
  });

  it('should derive the correct encryption key using Argon2', async () => {
    cipher = new Cipher({
      email,
      masterPwd,
      kdfParams: { ...kdfParams, kdfAlgorithm: KdfAlgorithm.Argon2 }
    });
    const encryptionKey = await cipher['_getEncryptionKey']();
    expect(encryptionKey).toBeDefined();
    expect(typeof encryptionKey).toBe('string');
  });
});
