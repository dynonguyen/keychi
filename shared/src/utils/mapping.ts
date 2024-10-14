import { ThemeMode } from '../constants/theme';
import { TFunction } from '../types/common.type';

export function themeMapping(t: TFunction, theme?: ThemeMode) {
  const mapping: Record<ThemeMode, { label: string; icon: string }> = {
    [ThemeMode.Light]: { label: t('theme.light'), icon: 'icon msi-wb-sunny-rounded' },
    [ThemeMode.Dark]: { label: t('theme.dark'), icon: 'icon msi-mode-night-outline-rounded' },
    [ThemeMode.System]: { label: t('theme.system'), icon: 'icon msi-computer-outline-rounded' }
  };

  return { mapping, ...(theme ? mapping[theme] : {}) };
}
