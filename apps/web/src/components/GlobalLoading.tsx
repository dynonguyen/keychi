import { COLOR_PALETTE } from '@shared/constants';
import { Flex } from '@shared/react-web/components';
import useTheme from '../hooks/useTheme';

export const GlobalLoading = () => {
  const { isDark } = useTheme();
  const color = COLOR_PALETTE[isDark ? 'dark' : 'light'].primary['500'];
  const dur = 1;

  return (
    <Flex center className="w-screen h-screen">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="size-20">
        <circle fill={color} stroke={color} strokeWidth="15" r="15" cx="40" cy="65">
          <animate
            attributeName="cy"
            calcMode="spline"
            dur={dur}
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </circle>
        <circle fill={color} stroke={color} strokeWidth="15" r="15" cx="100" cy="65">
          <animate
            attributeName="cy"
            calcMode="spline"
            dur={dur}
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </circle>
        <circle fill={color} stroke={color} strokeWidth="15" r="15" cx="160" cy="65">
          <animate
            attributeName="cy"
            calcMode="spline"
            dur={dur}
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
      </svg>
    </Flex>
  );
};

export default GlobalLoading;
