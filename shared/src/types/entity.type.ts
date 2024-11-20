type Entity<T> = {
  id: number;
  createdAt: string;
  updatedAt: string;
} & T;

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system'
}

export enum Language {
  Vi = 'vi',
  En = 'en'
}

export enum KdfAlgorithm {
  PBKDF2 = 'pbkdf2',
  Argon2 = 'argon2'
}

export enum VaultTimeoutAction {
  Lock = 'lock',
  Logout = 'logout'
}

export enum VaultType {
  Login = 'login',
  Card = 'card'
}

export enum VaultCustomFieldType {
  Text = 'text',
  Secure = 'secure',
  Boolean = 'boolean'
}

export type VaultCustomField = {
  type: VaultCustomFieldType;
  name: string;
  value: string;
};

export type VaultLoginProperty = {
  username: string;
  password: string;
  urls?: string[];
};

export type VaultCardProperty = {
  cardholderName: string;
  cardNumber: string;
  brand: string;
  cvv: number;
  expireMonth: number;
  expireYear: number;
};

export type VaultUpdateHistory = {
  createdAt: string;
  value: object;
};

// -----------------------------
export type User = Entity<{
  email: string;
  name: string;
  avatar: string;
  pwdHint?: string;
}>;

export type UserSetting = Entity<{
  userId: number;
  theme: ThemeMode;
  vaultTimeout: number;
  vaultTimeoutAction: VaultTimeoutAction;
  language: Language;
  kdfAlgorithm: KdfAlgorithm;
  kdfIterations: number;
}>;

export type Folder = Entity<{
  userId: number;
  name: string;
  icon?: string | null;
  color?: string | null;
}>;

export type Vault = Entity<{
  userId: number;
  folderId?: number | null;
  name: string;
  type: VaultType;
  customFields?: VaultCustomField[];
  properties: VaultLoginProperty | VaultCardProperty;
  note?: string | null;
  deleted: boolean;
  updateHistories: VaultUpdateHistory[];
}>;

export type Device = Entity<{
  userId: number;
  name: string;
  platform: string;
  ipv4: string;
  active: boolean;
  loggedAt: string;
}>;
