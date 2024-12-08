import { ThemeMode } from '@shared/types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import useSetTheme from '../hooks/useSetTheme';
import { useProfileStore } from '../stores/profile';
import { themeMapping } from '../utils/mapping';

export const ThemeController = () => {
  const { preferences } = useProfileStore();
  const { t } = useTranslation();
  const setTheme = useSetTheme();

  const { mapping } = themeMapping(t);
  const options = Object.entries(mapping);

  return options.map(([mode, { icon }]) => (
    <span
      key={mode}
      onClick={() => setTheme(mode as ThemeMode)}
      className={clsx(icon, {
        'text-primary text-2xl': mode === preferences.theme
      })}
    ></span>
  ));
};

export default ThemeController;
