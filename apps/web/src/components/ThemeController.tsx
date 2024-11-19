import { ThemeMode } from '@shared/types';
import { themeMapping } from '@shared/utils';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../stores/theme';

export const ThemeController = () => {
  const { theme, changeTheme } = useThemeStore();
  const { t } = useTranslation();

  const { mapping } = themeMapping(t);
  const options = Object.entries(mapping);

  return options.map(([mode, { icon }]) => (
    <span
      key={mode}
      onClick={() => {
        changeTheme(mode as ThemeMode);
      }}
      className={clsx(icon, { 'text-primary text-2xl': mode === theme })}
    ></span>
  ));
};

export default ThemeController;
