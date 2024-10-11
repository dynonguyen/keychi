/// <reference types="vite/client" />

interface ImportMetaEnv {
  KEYCHI_BASE_URL: string;
  KEYCHI_ASSET_URL: string;
}

/** Access vite env via key */
export function getEnv<T extends keyof ImportMetaEnv>(key: T) {
  return (import.meta.env[key] || '') as ImportMetaEnv[T];
}
