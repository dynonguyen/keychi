import { DEFAULT } from '@shared/constants';
import { ThemeMode } from '@shared/types';
import React from 'react';
import { LS_KEY } from '../constants/key';
import { useProfileStore } from '../stores/profile';
import { getActualTheme } from '../utils/mapping';

const ThemeWatcher = () => {
  const theme = useProfileStore((state) => state?.preferences?.theme);

  const initTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem(LS_KEY.THEME) as ThemeMode | undefined;
    return savedTheme && Object.values(ThemeMode).includes(savedTheme) ? savedTheme : DEFAULT.USER_THEME;
  };

  React.useEffect(() => {
    const actualTheme = getActualTheme(theme || initTheme());

    localStorage.setItem(LS_KEY.THEME, actualTheme);
    document.documentElement.classList.remove(...Object.values(ThemeMode));
    document.documentElement.classList.add(actualTheme);
  }, [theme]);

  return null;
};

export default ThemeWatcher;
