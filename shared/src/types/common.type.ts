export type ApiErrorResponse = {
  status: number;
  message: string;
  code: string;
};

export type ApiResponse<T = unknown> = {
  data: T;
  status: number;
};
