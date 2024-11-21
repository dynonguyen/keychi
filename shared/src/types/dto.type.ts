import { UserSetting } from './entity.type';

export type RegisterReqDto = {
  email: string;
  password: string;
  name: string;
  pwdHint: string;
};

export type PreLoginReqDto = {
  email: string;
};
export type PreLoginRespDto = Pick<UserSetting, 'kdfAlgorithm' | 'kdfIterations' | 'kdfMemory' | 'kdfParallelism'>;

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
