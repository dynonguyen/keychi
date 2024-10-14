import { LS_KEY } from '@shared/constants/key';
import { ThemeMode } from '@shared/constants/theme';
import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';

type ThemeStore = {
  theme: ThemeMode;
  changeTheme(theme: ThemeMode): void;
};

const setPersistedTheme = (newTheme: ThemeMode) => {
  const actualTheme =
    newTheme !== ThemeMode.System
      ? newTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeMode.Dark
        : ThemeMode.Light;
  localStorage.setItem(LS_KEY.THEME, newTheme);
  document.documentElement.setAttribute('data-theme', actualTheme);
};

const initTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem(LS_KEY.THEME);

  const newTheme =
    savedTheme && Object.values(ThemeMode).some((value) => value === savedTheme)
      ? (savedTheme as ThemeMode)
      : ThemeMode.System;
  setPersistedTheme(newTheme);

  return newTheme;
};

export const useThemeStore = createWithEqualityFn<ThemeStore>(
  (set) => ({
    theme: initTheme(),
    changeTheme(newTheme) {
      setPersistedTheme(newTheme);
      set({ theme: newTheme });
    }
  }),
  isEqual
);

export default useThemeStore;
