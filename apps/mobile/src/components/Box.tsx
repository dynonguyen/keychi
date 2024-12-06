import { ColorPaletteToken } from '@shared/constants';
import { get } from 'lodash-es';
import React from 'react';
import { ScrollView, View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type BoxProps = ViewProps & {
  spacing?: number;
  bgcolor?: ColorPaletteToken;
  scrollable?: boolean;
};

const SPACE_UNIT = 4;

export const Box = (props: BoxProps) => {
  const { spacing = 0, bgcolor, style, scrollable, ...others } = props;
  const theme = useTheme();

  const customStyles = React.useMemo(() => {
    const styles: ViewStyle = { gap: spacing * SPACE_UNIT };

    if (bgcolor) {
      styles.backgroundColor = get(theme.palette, bgcolor);
    }

    return styles;
  }, [theme.isDark, spacing, bgcolor]);

  const Component = scrollable ? ScrollView : View;

  return <Component {...others} style={[style, customStyles]} />;
};

export default Box;
