import { ENDPOINT } from '@keychi/shared/constants';
import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';
import { SS_KEY } from '../constants/key';
import { PATH } from '../constants/path';
import { mutation } from '../libs/query-client';

type AuthState = {
  isLoading: boolean;
  isInitiated: boolean;
  isAuthenticated: boolean;
};

type AuthAction = {
  setAuth(auth: Partial<AuthState>): void;
  logout(shouldRedirect?: boolean): void;
};

export type AuthStore = AuthState & AuthAction;

const defaultStore = {
  isLoading: true,
  isInitiated: false,
  isAuthenticated: false
} as AuthState;

export const useAuthStore = createWithEqualityFn<AuthStore>(
  (set) => ({
    ...defaultStore,

    setAuth: set,

    async logout(shouldRedirect = true) {
      const refreshToken = sessionStorage.getItem(SS_KEY.REFRESH_TOKEN);

      if (refreshToken) {
        await mutation<string, { refreshToken: string }>(ENDPOINT.POST_LOGOUT)({ refreshToken });
      }

      sessionStorage.removeItem(SS_KEY.ACCESS_TOKEN);
      sessionStorage.removeItem(SS_KEY.REFRESH_TOKEN);
      sessionStorage.removeItem(SS_KEY.LOGGED_USER);

      set(defaultStore);

      if (shouldRedirect) location.pathname = PATH.LOGIN;
    }
  }),
  isEqual
);
