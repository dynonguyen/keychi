import { Language, ThemeMode, VaultTimeoutAction } from '../types/entity.type';

export const DEFAULT = {
  VAULT_TIMEOUT: 0,
  VAULT_TIMEOUT_ACTION: VaultTimeoutAction.Lock,
  USER_LANGUAGE: Language.En,
  USER_THEME: ThemeMode.System,
  KDF_TYPE: 'PBKDF2',
  KDF_PBKDF2_ITERATIONS: 600_000,
  KDF_ARGON2_ITERATIONS: 2
};
