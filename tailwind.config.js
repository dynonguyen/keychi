import materialSymbolIcons from '@iconify-json/material-symbols/icons.json';
import { addIconSelectors } from '@iconify/tailwind';
import { nextui } from '@nextui-org/react';
import plugin from 'tailwindcss/plugin';
import { COLOR_PALETTE } from './shared/src/constants/theme';
import customIcons from './tailwind-custom-icons.json';

const utilClasses = plugin(function ({ addUtilities }) {
  addUtilities({
    '.flex-v-center': { display: 'flex', alignItems: 'center' },
    '.flex-center': { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  });
});

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    relative: true,
    files: [
      './apps/web/**/*.{ts,tsx}',
      './shared/**/*.ts',
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ]
  },

  darkMode: 'class',

  theme: {
    extend: {
      screens: { sm: '576px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }
    }
  },

  plugins: [
    addIconSelectors({
      prefixes: [
        { prefix: 'msi', source: materialSymbolIcons },
        { prefix: 'other', source: customIcons }
      ],
      maskSelector: '.icon',
      iconSelector: '.{prefix}-{name}'
    }),
    utilClasses,
    nextui({
      prefix: 'keychi',
      themes: {
        // light: { colors: COLOR_PALETTE.light },
        dark: { colors: COLOR_PALETTE.dark }
      }
    })
  ]
};
