import { EnvMode } from '@shared/constants';

interface ImportExpoEnv {
  EXPO_PUBLIC_ASSET_URL: string;
  EXPO_PUBLIC_API_URL: string;
  EXPO_PUBLIC_ENV_MODE: EnvMode;
  EXPO_PUBLIC_AUTH_KDF_SALT: string;
}

/** Access expo env via key */
export function getEnv<T extends keyof ImportExpoEnv>(key: T) {
  return (process.env[key] || '') as ImportExpoEnv[T];
}
