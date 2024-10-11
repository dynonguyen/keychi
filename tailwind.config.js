/* eslint-disable @nx/enforce-module-boundaries */
import materialSymbolIcons from '@iconify-json/material-symbols/icons.json';
import { addIconSelectors } from '@iconify/tailwind';
import daisyui from 'daisyui';
import plugin from 'tailwindcss/plugin';
import { COLOR_PALETTE } from './shared/src/constants/theme';
import customIcons from './tailwind-custom-icons.json';

function toSnakeCase(str) {
  return str.toLowerCase().replace('_', '-');
}

function covertDaisyPalette(theme) {
  return Object.fromEntries(Object.entries(theme).map(([key, value]) => [toSnakeCase(key), value]));
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./{apps,libs,shared}/**/*.{ts,tsx,vue}'],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {},
      screens: { sm: '576px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }
    }
  },

  plugins: [
    daisyui,
    addIconSelectors({
      prefixes: [
        { prefix: 'msi', source: materialSymbolIcons },
        { prefix: 'other', source: customIcons }
      ],
      maskSelector: '.icon',
      iconSelector: '.{prefix}-{name}'
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-v-center': { display: 'flex', alignItems: 'center' },
        '.flex-center': { display: 'flex', alignItems: 'center', justifyContent: 'center' }
      });
    })
  ],

  daisyui: {
    styled: true,
    darkTheme: 'dark',
    themeRoot: ':root',
    utils: true,
    logs: false,
    themes: [{ light: covertDaisyPalette(COLOR_PALETTE.LIGHT) }, { dark: covertDaisyPalette(COLOR_PALETTE.DARK) }]
  }
};
