import { ThemeMode } from '@shared/types';
import React from 'react';
import { LS_KEY } from '../constants/key';
import { useProfileStore } from '../stores/profile';
import { getActualTheme } from '../utils/mapping';

const ThemeWatcher = () => {
  const theme = useProfileStore((state) => state.preferences.theme);

  React.useEffect(() => {
    const actualTheme = getActualTheme(theme);

    localStorage.setItem(LS_KEY.THEME, theme);
    document.documentElement.classList.remove(...Object.values(ThemeMode));
    document.documentElement.classList.add(actualTheme);
  }, [theme]);

  return null;
};

export default ThemeWatcher;
