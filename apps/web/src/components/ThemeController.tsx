import { ThemeMode } from '@shared/constants/theme';
import { themeMapping } from '@shared/utils/mapping';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../stores/theme';

export const ThemeController = () => {
  const { changeTheme } = useThemeStore();
  const { t } = useTranslation();

  const { mapping } = themeMapping(t);
  const options = Object.entries(mapping);

  return options.map(([mode, { icon }]) => (
    <span
      key={mode}
      onClick={() => {
        changeTheme(mode as ThemeMode);
      }}
      className={`${icon}`}
    ></span>
  ));
};

export default ThemeController;
