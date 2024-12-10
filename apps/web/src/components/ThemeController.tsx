import { DEFAULT } from '@shared/constants';
import { ThemeMode } from '@shared/types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import useTheme from '../hooks/useTheme';
import { useProfileStore } from '../stores/profile';
import { themeMapping } from '../utils/mapping';

export const ThemeController = () => {
  const theme = useProfileStore((state) => state?.preferences?.theme) || DEFAULT.USER_THEME;
  const { t } = useTranslation();
  const { setTheme } = useTheme();

  const { mapping } = themeMapping(t);
  const options = Object.entries(mapping);

  return options.map(([mode, { icon }]) => (
    <span
      key={mode}
      onClick={() => setTheme(mode as ThemeMode)}
      className={clsx(icon, { 'text-primary text-2xl': mode === theme })}
    ></span>
  ));
};

export default ThemeController;
