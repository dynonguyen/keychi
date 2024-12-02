/// <reference types="vite/client" />

import { EnvMode } from '../../constants';

interface ImportMetaEnv {
  VITE_BASE_URL: string;
  VITE_ASSET_URL: string;
  VITE_API_URL: string;
  VITE_ENV_MODE: EnvMode;
  VITE_AUTH_KDF_SALT: string;
}

/** Access vite env via key */
export function getEnv<T extends keyof ImportMetaEnv>(key: T) {
  return (import.meta.env[key] || '') as ImportMetaEnv[T];
}
