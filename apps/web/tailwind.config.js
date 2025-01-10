import materialSymbolIcons from '@iconify-json/material-symbols/icons.json';
import { addIconSelectors } from '@iconify/tailwind';
import twAnimatePlugin from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin';
import { BASE_RADIUS, SHADCN_COLOR_PALETTE } from '../../shared/src/constants/theme';
import { generateTailwindColors } from '../../shared/src/utils/tailwind-helper';
import customIcons from './tailwind-custom-icons.json';

const utilClassesPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.flex-v-center': { display: 'flex', alignItems: 'center' },
    '.flex-center': { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  });
});

const iconifyPlugin = addIconSelectors({
  prefixes: [
    { prefix: 'msi', source: materialSymbolIcons },
    { prefix: 'ki', source: customIcons }
  ],
  maskSelector: '.icon',
  iconSelector: '.{prefix}-{name}'
});

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],

  darkMode: ['class'],

  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      borderRadius: {
        lg: `${BASE_RADIUS}px`,
        md: `${BASE_RADIUS - 2}px`,
        sm: `${BASE_RADIUS - 4}px`
      },
      colors: generateTailwindColors(SHADCN_COLOR_PALETTE.light)
    }
  },

  plugins: [utilClassesPlugin, twAnimatePlugin, iconifyPlugin]
};
