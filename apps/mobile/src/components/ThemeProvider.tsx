import { COLOR_PALETTE } from '@shared/constants';
import React from 'react';
import { DeepPartial } from 'shared/src/types/util.type';
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

  return <ThemeContext.Provider value={{ palette, isDark: false, globalStyles }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
