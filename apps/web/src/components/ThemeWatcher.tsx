import { ThemeMode } from '@keychi/shared/types';
import React from 'react';
import { LS_KEY } from '../constants/key';
import { getActualTheme, getLSTheme } from '../hooks/useTheme';
import { useProfileStore } from '../stores/profile';

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
