import { COLOR_PALETTE } from '@keychi/shared/constants';
import { DeepPartial } from '@keychi/shared/types';
import React from 'react';
import { createGlobalStyles, ThemeContext, ThemeContextValue } from '../contexts/theme';

type ThemeProviderProps = DeepPartial<ThemeContextValue> & {
  children: React.ReactNode;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  // MOCK: Get theme from user preferences
  const palette = COLOR_PALETTE.light;
  const isDark = false;

  const globalStyles = createGlobalStyles({ palette, isDark });

  return (
    <ThemeContext.Provider value={{ palette, isDark: false, globalStyles, changeTheme: () => null }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
