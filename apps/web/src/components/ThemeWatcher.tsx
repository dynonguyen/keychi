import { DEFAULT } from '@shared/constants';
import { ThemeMode } from '@shared/types';
import React from 'react';
import { LS_KEY } from '../constants/key';
import { useProfileStore } from '../stores/profile';

const getActualTheme = (theme: ThemeMode): ThemeMode => {
  if (theme !== ThemeMode.System) return theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeMode.Dark : ThemeMode.Light;
};

const getLSTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem(LS_KEY.THEME) as ThemeMode | undefined;
  return savedTheme && Object.values(ThemeMode).includes(savedTheme) ? savedTheme : DEFAULT.USER_THEME;
};

const ThemeWatcher = () => {
  const theme = useProfileStore((state) => state?.preferences?.theme);

  React.useEffect(() => {
    const actualTheme = getActualTheme(theme || getLSTheme());

    localStorage.setItem(LS_KEY.THEME, actualTheme);
    document.documentElement.classList.remove(...Object.values(ThemeMode));
    document.documentElement.classList.add(actualTheme);
  }, [theme]);

  return null;
};

export default ThemeWatcher;
