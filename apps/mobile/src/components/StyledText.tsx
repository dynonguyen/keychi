import { ColorPaletteToken } from '@shared/constants';
import { get } from 'lodash-es';
import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type StyledTextProps = TextProps & {
  color?: ColorPaletteToken;
};

export const StyledText = (props: StyledTextProps) => {
  const { color, style, ...others } = props;
  const theme = useTheme();

  const customStyles = React.useMemo(
    () => (color ? { color: get(theme.palette, color) } : null),
    [theme.isDark, color]
  );

  return <Text {...others} style={[theme.globalStyles.text, style, customStyles]} />;
};

export default StyledText;
