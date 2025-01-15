import { DEFAULT, ENDPOINT } from '@keychi/shared/constants';
import { PreferencesReqDto, PreferencesType, ThemeMode } from '@keychi/shared/types';
import { getErrorMessage } from '@keychi/shared/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ApiResponse } from 'shared/src/types/common.type';
import { LS_KEY } from '../constants/key';
import { mutation } from '../libs/query-client';
import { useAuthStore } from '../stores/auth';
import { useProfileStore } from '../stores/profile';

const updateTheme = mutation<ApiResponse, PreferencesReqDto>(ENDPOINT.PATCH_PREFERENCES, undefined, 'patch');

export const getActualTheme = (theme: ThemeMode): ThemeMode => {
  if (theme !== ThemeMode.System) return theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeMode.Dark : ThemeMode.Light;
};

export const getLSTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem(LS_KEY.THEME) as ThemeMode | undefined;
  return savedTheme && Object.values(ThemeMode).includes(savedTheme) ? savedTheme : DEFAULT.USER_THEME;
};

export const useTheme = () => {
  const themeMutation = useMutation({ mutationFn: updateTheme });

  const themePreference = useProfileStore((state) => state?.preferences?.theme);
  const isDark = getActualTheme(themePreference || getLSTheme()) === ThemeMode.Dark;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const setTheme = async (mode: ThemeMode) => {
    if (themePreference === mode) {
      return;
    }

    if (isAuthenticated) {
      const [error] = await themeMutation.mutateAsync({
        type: PreferencesType.UI,
        properties: { theme: mode }
      });

      if (error) return toast.error(getErrorMessage(error));
    }

    useProfileStore.setState((state) => ({ preferences: { ...state?.preferences, theme: mode } }));
  };

  return { setTheme, isDark };
};

export default useTheme;
