import { Any } from '@shared/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContextValue } from '../contexts/theme';
import { useTheme } from '../hooks/useTheme';

export function makeStyles<P, T extends StyleSheet.NamedStyles<T>>(
  factory: (theme: ThemeContextValue, props?: P) => T & StyleSheet.NamedStyles<Any>
) {
  return (props?: P) => {
    const theme = useTheme();

    return React.useMemo(() => {
      return StyleSheet.create(factory(theme, props));
    }, [props, theme.isDark]);
  };
}

export function makeStylesWithoutMemo<P, T extends StyleSheet.NamedStyles<T>>(
  factory: (theme: ThemeContextValue, props?: P) => T & StyleSheet.NamedStyles<Any>
) {
  return (props?: P) => {
    const theme = useTheme();

    return StyleSheet.create(factory(theme, props));
  };
}
