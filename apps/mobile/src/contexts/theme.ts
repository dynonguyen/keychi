import { COLOR_PALETTE, ColorPalette } from '@keychi/shared/constants';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeMode } from 'shared/src/types/entity.type';

type GlobalStyles = ReturnType<typeof createGlobalStyles>;

export type ThemeContextValue = {
  isDark: boolean;
  palette: ColorPalette;
  globalStyles: GlobalStyles;
};

export type ThemeContextAction = {
  changeTheme(isDark: boolean): void;
};

export type ThemeContextState = ThemeContextValue & ThemeContextAction;

export function createGlobalStyles(theme: Pick<ThemeContextValue, 'isDark' | 'palette'>) {
  const { palette } = theme;

  return StyleSheet.create({
    text: {
      color: palette.content1.foreground
    }
  });
}

export const ThemeContext = React.createContext<ThemeContextState>({
  isDark: false,
  palette: COLOR_PALETTE[ThemeMode.Light],
  globalStyles: {} as GlobalStyles,
  changeTheme: () => null
});
