export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system'
}

export const COLOR_PALETTE = {
  light: {
    background: {
      DEFAULT: '#FFFFFF'
    },
    foreground: {
      '50': '#fafafa',
      '100': '#f4f4f5',
      '200': '#e4e4e7',
      '300': '#d4d4d8',
      '400': '#a1a1aa',
      '500': '#71717a',
      '600': '#52525b',
      '700': '#3f3f46',
      '800': '#27272a',
      '900': '#18181b',
      DEFAULT: '#11181C'
    },
    primary: {
      '50': '#e6f1fe',
      '100': '#cce3fd',
      '200': '#99c7fb',
      '300': '#66aaf9',
      '400': '#338ef7',
      '500': '#006FEE',
      '600': '#005bc4',
      '700': '#004493',
      '800': '#002e62',
      '900': '#001731',
      foreground: '#fff',
      DEFAULT: '#006FEE'
    },
    secondary: {
      '50': '#f2eafa',
      '100': '#e4d4f4',
      '200': '#c9a9e9',
      '300': '#ae7ede',
      '400': '#9353d3',
      '500': '#7828c8',
      '600': '#6020a0',
      '700': '#481878',
      '800': '#301050',
      '900': '#180828',
      foreground: '#fff',
      DEFAULT: '#7828c8'
    },
    success: {
      '50': '#e8faf0',
      '100': '#d1f4e0',
      '200': '#a2e9c1',
      '300': '#74dfa2',
      '400': '#45d483',
      '500': '#17c964',
      '600': '#12a150',
      '700': '#0e793c',
      '800': '#095028',
      '900': '#052814',
      foreground: '#000',
      DEFAULT: '#17c964'
    },
    warning: {
      '50': '#fefce8',
      '100': '#fdedd3',
      '200': '#fbdba7',
      '300': '#f9c97c',
      '400': '#f7b750',
      '500': '#f5a524',
      '600': '#c4841d',
      '700': '#936316',
      '800': '#62420e',
      '900': '#312107',
      foreground: '#000',
      DEFAULT: '#f5a524'
    },
    danger: {
      '50': '#fee7ef',
      '100': '#fdd0df',
      '200': '#faa0bf',
      '300': '#f871a0',
      '400': '#f54180',
      '500': '#f31260',
      '600': '#c20e4d',
      '700': '#920b3a',
      '800': '#610726',
      '900': '#310413',
      foreground: '#ffffff',
      DEFAULT: '#f31260'
    },
    default: {
      '50': '#fafafa',
      '100': '#f4f4f5',
      '200': '#e4e4e7',
      '300': '#d4d4d8',
      '400': '#a1a1aa',
      '500': '#71717a',
      '600': '#52525b',
      '700': '#3f3f46',
      '800': '#27272a',
      '900': '#18181b',
      foreground: '#000',
      DEFAULT: '#d4d4d8'
    },
    divider: {
      DEFAULT: 'rgba(17, 17, 17, 0.15)'
    },
    focus: {
      DEFAULT: '#006FEE'
    },
    overlay: {
      DEFAULT: '#000000'
    },
    content1: {
      DEFAULT: '#FFFFFF',
      foreground: '#11181C'
    },
    content2: {
      DEFAULT: '#f4f4f5',
      foreground: '#27272a'
    },
    content3: {
      DEFAULT: '#e4e4e7',
      foreground: '#3f3f46'
    },
    content4: {
      DEFAULT: '#d4d4d8',
      foreground: '#52525b'
    }
  },

  dark: {
    background: {
      DEFAULT: '#18191A'
    },
    foreground: {
      '50': '#18181b',
      '100': '#27272a',
      '200': '#3f3f46',
      '300': '#52525b',
      '400': '#71717a',
      '500': '#a1a1aa',
      '600': '#d4d4d8',
      '700': '#e4e4e7',
      '800': '#f4f4f5',
      '900': '#fafafa',
      DEFAULT: '#ECEDEE'
    },
    primary: {
      '50': '#001731',
      '100': '#002e62',
      '200': '#004493',
      '300': '#005bc4',
      '400': '#006FEE',
      '500': '#338ef7',
      '600': '#66aaf9',
      '700': '#99c7fb',
      '800': '#cce3fd',
      '900': '#e6f1fe',
      foreground: '#fff',
      DEFAULT: '#006FEE'
    },
    secondary: {
      '50': '#180828',
      '100': '#301050',
      '200': '#481878',
      '300': '#6020a0',
      '400': '#7828c8',
      '500': '#9353d3',
      '600': '#ae7ede',
      '700': '#c9a9e9',
      '800': '#e4d4f4',
      '900': '#f2eafa',
      foreground: '#fff',
      DEFAULT: '#9353d3'
    },
    success: {
      '50': '#052814',
      '100': '#095028',
      '200': '#0e793c',
      '300': '#12a150',
      '400': '#17c964',
      '500': '#45d483',
      '600': '#74dfa2',
      '700': '#a2e9c1',
      '800': '#d1f4e0',
      '900': '#e8faf0',
      foreground: '#000',
      DEFAULT: '#17c964'
    },
    warning: {
      '50': '#312107',
      '100': '#62420e',
      '200': '#936316',
      '300': '#c4841d',
      '400': '#f5a524',
      '500': '#f7b750',
      '600': '#f9c97c',
      '700': '#fbdba7',
      '800': '#fdedd3',
      '900': '#fefce8',
      foreground: '#000',
      DEFAULT: '#f5a524'
    },
    danger: {
      '50': '#310413',
      '100': '#610726',
      '200': '#920b3a',
      '300': '#c20e4d',
      '400': '#f31260',
      '500': '#f54180',
      '600': '#f871a0',
      '700': '#faa0bf',
      '800': '#fdd0df',
      '900': '#fee7ef',
      foreground: '#ffffff',
      DEFAULT: '#f31260'
    },
    default: {
      '50': '#18181b',
      '100': '#27272a',
      '200': '#3f3f46',
      '300': '#52525b',
      '400': '#71717a',
      '500': '#a1a1aa',
      '600': '#d4d4d8',
      '700': '#e4e4e7',
      '800': '#f4f4f5',
      '900': '#fafafa',
      foreground: '#fff',
      DEFAULT: '#3f3f46'
    },
    focus: {
      DEFAULT: '#006FEE'
    },
    overlay: {
      DEFAULT: '#000000'
    },
    divider: {
      DEFAULT: 'rgba(255, 255, 255, 0.15)'
    },
    content1: {
      DEFAULT: '#18181b',
      foreground: '#fafafa'
    },
    content2: {
      DEFAULT: '#27272a',
      foreground: '#f4f4f5'
    },
    content3: {
      DEFAULT: '#3f3f46',
      foreground: '#e4e4e7'
    },
    content4: {
      DEFAULT: '#52525b',
      foreground: '#d4d4d8'
    }
  }
};
