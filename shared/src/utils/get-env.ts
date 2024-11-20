/// <reference types="vite/client" />

import { EnvMode } from '../constants/common';

interface ImportMetaEnv {
  WEB_BASE_URL: string;
  WEB_ASSET_URL: string;
  WEB_API_URL: string;
  WEB_ENV_MODE: EnvMode;
}

/** Access vite env via key */
export function getEnv<T extends keyof ImportMetaEnv>(key: T) {
  return (import.meta.env[key] || '') as ImportMetaEnv[T];
}
