import { ColorPalette } from '../constants';
import { hexToHsl } from './hex-to-hsl';

type TailwindColor = { DEFAULT: string } & Record<string, string>;
type Palette = Record<string, Record<string, string>>;

export const getShadcnColors = (p: ColorPalette) => ({
  ...p,
  card: {
    main: p.background.main,
    foreground: p.foreground.main
  },
  popover: {
    main: p.background.main,
    foreground: p.foreground.main
  },
  muted: {
    main: p.neutral[100],
    foreground: p.foreground[500]
  },
  accent: {
    main: p.neutral[100],
    foreground: p.foreground[900]
  },
  destructive: {
    main: p.error[500],
    foreground: p.foreground[50]
  },
  border: {
    main: p.neutral[200]
  },
  input: {
    main: p.neutral[200]
  },
  ring: {
    main: p.neutral[800]
  }
});

export function generateTailwindColors(palette: Palette) {
  const result: Record<string, TailwindColor> = {};

  Object.entries(palette).forEach(([cKey, color]) => {
    result[cKey] = {
      DEFAULT: `hsl(var(--${cKey}))`,
      ...Object.keys(color).reduce(
        (acc, token) => {
          acc[token] = token === 'main' ? `hsl(var(--${cKey}))` : `hsl(var(--${cKey}-${token}))`;

          return acc;
        },
        {} as Record<string, string>
      )
    };
  });

  return result;
}

export function generateCssVariables(palette: Palette) {
  const result: Record<string, string> = {};

  Object.entries(palette).forEach(([cKey, color]) => {
    Object.entries(color).forEach(([token, hex]) => {
      const [h, s, l] = hexToHsl(hex);
      const hslColor = `${h} ${s}% ${l}%`;

      result[`--${cKey}-${token}`] = hslColor;
      if (token === 'main') result[`--${cKey}`] = hslColor;
    });
  });

  return result;
}
