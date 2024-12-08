import { ThemeMode } from '@shared/types';
import { LS_KEY } from '../constants/key';
import { useProfileStore } from '../stores/profile';
import { getActualTheme } from '../utils/mapping';

const ThemeWatcher = () => {
  const { preferences } = useProfileStore();
  const persistTheme = (theme: ThemeMode) => {
    const actualTheme = getActualTheme(theme);

    localStorage.setItem(LS_KEY.THEME, theme);
    document.documentElement.classList.remove(...Object.values(ThemeMode));
    document.documentElement.classList.add(actualTheme);
  };

  persistTheme(preferences.theme);

  return null;
};

export default ThemeWatcher;
