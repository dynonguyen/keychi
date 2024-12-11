import { PreferencesType, User, UserPreferences } from './entity.type';

export type RegisterReqDto = {
  email: string;
  password: string;
  name: string;
  pwdHint: string;
};

export type LoginReqDto = {
  email: string;
  password: string;
};
export type LoginRespDto = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
};

export type UIPropertiesReqDto = {
  theme: string;
  language: string;
};
export type CipherPropertiesReqDto = {
  kdfSalt: string;
  kdfAlgorithm: string;
  kdfIterations: number;
  kdfMemory: number;
  kdfParallelism: number;
};

export type PreferencesReqDto = {
  type: PreferencesType;
  properties: Partial<UIPropertiesReqDto | CipherPropertiesReqDto>;
};

export type UserProfile = User & { preferences: UserPreferences };
