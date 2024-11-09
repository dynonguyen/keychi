import type { User } from '@shared/types/entity.type';
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
  logout(): void;
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
    logout() {
      set(defaultStore);
      location.pathname = PATH.LOGIN;
    }
  }),
  isEqual
);
