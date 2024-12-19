import { Any } from '@keychi/shared/types';
import { MutationFunction, QueryClient } from '@tanstack/react-query';
import to from 'await-to-js';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';
import { ApiErrorResponse, ApiResponse } from 'shared/src/types/common.type';
import { SS_KEY } from '../constants/key';
import { useAuthStore } from '../stores/auth';
import { getEnv } from '../utils/get-env';

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: getEnv('VITE_API_URL'),
    headers: { 'Content-Type': 'application/json' }
  });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = sessionStorage.getItem(SS_KEY.ACCESS_TOKEN);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.status === HttpStatusCode.Unauthorized) {
        useAuthStore.getState().logout();
      }

      return response;
    },
    (error) => Promise.reject(error)
  );

  return instance;
}

export const axiosInstance = createAxiosInstance();

export function fetcher<T>(endpoint: string, options?: AxiosRequestConfig) {
  return () =>
    axiosInstance<T, AxiosResponse<T, Any>>({ method: 'get', url: endpoint, ...options }).then(
      (res) => (res.data as ApiResponse<T>)?.data
    );
}

type MutationFnResponse<Response> = [undefined, ApiResponse<Response>] | [ApiErrorResponse, undefined];
export function mutation<Response = unknown, Data = unknown>(
  endpoint: string,
  options?: AxiosRequestConfig,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post'
): MutationFunction<MutationFnResponse<Response>, Data> {
  return async (data: Data) => {
    const [error, response] = await to<AxiosResponse<Response>, AxiosError>(
      axiosInstance({ url: endpoint, method, data, ...options })
    );

    if (error) {
      return [error.response?.data || error.response, undefined] as MutationFnResponse<Response>;
    }

    return [undefined, response?.data] as MutationFnResponse<Response>;
  };
}

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiErrorResponse;
  }
}
