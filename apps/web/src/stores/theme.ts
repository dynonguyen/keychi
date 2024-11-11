import { LS_KEY, ThemeMode } from '@shared/constants';
import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';

type ThemeStore = {
  theme: ThemeMode;
  isDark: boolean;
  changeTheme(theme: ThemeMode): void;
};

const getActualTheme = (theme: ThemeMode) => {
  return theme !== ThemeMode.System
    ? theme
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeMode.Dark
      : ThemeMode.Light;
};

const setPersistedTheme = (theme: ThemeMode) => {
  const actualTheme = getActualTheme(theme);

  localStorage.setItem(LS_KEY.THEME, theme);
  document.documentElement.classList.remove(...Object.values(ThemeMode));
  document.documentElement.classList.add(actualTheme);

  return actualTheme;
};

const initTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem(LS_KEY.THEME) as ThemeMode | undefined;

  const newTheme =
    savedTheme && Object.values(ThemeMode).some((value) => value === savedTheme) ? savedTheme : ThemeMode.System;

  setPersistedTheme(newTheme);

  return newTheme;
};

export const useThemeStore = createWithEqualityFn<ThemeStore>((set) => {
  const initialTheme = initTheme();

  return {
    theme: initialTheme,
    isDark: getActualTheme(initialTheme) === ThemeMode.Dark,
    changeTheme(newTheme) {
      const actualTheme = setPersistedTheme(newTheme);
      set({ theme: newTheme, isDark: actualTheme === ThemeMode.Dark });
    }
  };
}, isEqual);

export default useThemeStore;
