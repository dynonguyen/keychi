import { ThemeMode } from '@shared/types';
import { TFunction } from 'i18next';

export function themeMapping(t: TFunction, theme?: ThemeMode) {
  const mapping: Record<ThemeMode, { label: string; icon: string }> = {
    [ThemeMode.Light]: { label: t('theme.light'), icon: 'icon msi-wb-sunny-rounded' },
    [ThemeMode.Dark]: { label: t('theme.dark'), icon: 'icon msi-mode-night-outline-rounded' },
    [ThemeMode.System]: { label: t('theme.system'), icon: 'icon msi-computer-outline-rounded' }
  };

  return { mapping, ...(theme ? mapping[theme] : {}) };
}

export function getActualTheme(theme: ThemeMode) {
  if (theme !== ThemeMode.System) return theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeMode.Dark : ThemeMode.Light;
}
