import materialSymbolIcons from '@iconify-json/material-symbols/icons.json';
import { addIconSelectors } from '@iconify/tailwind';
import twAnimatePlugin from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin';
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

  darkMode: ['class', 'class'],

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
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      }
    }
  },

  plugins: [iconifyPlugin, utilClassesPlugin, twAnimatePlugin]
};
