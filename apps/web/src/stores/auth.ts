import { ENDPOINT, LS_KEY, SS_KEY } from '@shared/constants';
import isEqual from 'react-fast-compare';
import { toast } from 'react-toastify';
import { createWithEqualityFn } from 'zustand/traditional';
import { PATH } from '../constants/path';
import { mutation } from '../libs/query-client';

type AuthState = {
  isLoading: boolean;
  isInitiated: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
};

type AuthAction = {
  setAuth(auth: Partial<AuthState>): void;
  logout(shouldRedirect?: boolean): void;
};

export type AuthStore = AuthState & AuthAction;

const defaultStore = {
  isLoading: true,
  isInitiated: false,
  isAuthenticated: false,
  accessToken: localStorage.getItem(LS_KEY.ACCESS_TOKEN) || '',
  refreshToken: localStorage.getItem(LS_KEY.REFRESH_TOKEN) || ''
} as AuthState;

export const useAuthStore = createWithEqualityFn<AuthStore>(
  (set, get) => ({
    ...defaultStore,

    setAuth: set,

    async logout(shouldRedirect = true) {
      const { refreshToken } = get();
      const [error] = await mutation<string, { refreshToken: string }>(ENDPOINT.POST_LOGOUT)({ refreshToken });

      if (error) return toast.error(error.message);

      localStorage.removeItem(LS_KEY.ACCESS_TOKEN);
      localStorage.removeItem(LS_KEY.REFRESH_TOKEN);
      sessionStorage.removeItem(SS_KEY.LOGGED_USER);

      set(defaultStore);

      if (shouldRedirect) location.pathname = PATH.LOGIN;
    }
  }),
  isEqual
);
