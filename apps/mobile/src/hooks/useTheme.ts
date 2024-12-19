import React from 'react';
import { ThemeContext } from '../contexts/theme';

export const useTheme = () => {
  return React.use(ThemeContext);
};
