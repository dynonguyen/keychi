import { LS_KEY } from '@shared/constants';
import { User } from '@shared/types';
import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';
import { PATH } from '../constants/path';

type AuthState = User & {
  isLoading: boolean;
  isInitiated: boolean;
  isAuthenticated: boolean;
  accessToken: string;
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
    logout(shouldRedirect = true) {
      // TODO: Call API logout
      localStorage.removeItem(LS_KEY.ACCESS_TOKEN);
      set(defaultStore);
      if (shouldRedirect) location.pathname = PATH.LOGIN;
    }
  }),
  isEqual
);
