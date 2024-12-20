export function hexToHsl(hex: string): [number, number, number] {
  // Remove '#' if present
  hex = hex.replace(/^#/, '');

  let r, g, b;

  // Handle 3-digit hex (expand to 6 digits)
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  }
  // Handle 6-digit hex
  else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }
  // Handle 8-digit hex (ignore alpha channel)
  else if (hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    throw new Error('Invalid hex color');
  }

  // Normalize r, g, b to [0, 1]
  r /= 255;
  g /= 255;
  b /= 255;

  // Find min and max values of r, g, b
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate lightness
  let h, s;
  let l = (max + min) / 2;

  // Calculate saturation
  if (delta === 0) {
    s = 0; // No saturation
  } else {
    s = l <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
  }

  // Calculate hue
  if (delta === 0) {
    h = 0; // No hue
  } else if (max === r) {
    h = (g - b) / delta + (g < b ? 6 : 0);
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return [h, s, l];
}
