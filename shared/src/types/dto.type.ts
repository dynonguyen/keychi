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
