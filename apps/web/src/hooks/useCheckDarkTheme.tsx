import { ThemeMode } from '@shared/types';
import { useProfileStore } from '../stores/profile';
import { getActualTheme } from '../utils/mapping';

export const useCheckDarkTheme = () => {
  const theme = useProfileStore((state) => state.preferences.theme);
  return getActualTheme(theme) === ThemeMode.Dark;
};

export default useCheckDarkTheme;
