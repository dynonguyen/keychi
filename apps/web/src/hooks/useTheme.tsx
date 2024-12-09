import { ENDPOINT } from '@shared/constants';
import { PreferencesReqDto, PreferencesType, ThemeMode } from '@shared/types';
import { ApiResponse } from 'shared/src/types/common.type';

import { getErrorMessage } from '@shared/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { mutation } from '../libs/query-client';
import { useProfileStore } from '../stores/profile';

const setThemeFn = mutation<ApiResponse, PreferencesReqDto>(ENDPOINT.PATCH_PREFERENCES, undefined, 'patch');

export const useTheme = () => {
  const setThemeMutation = useMutation({ mutationFn: setThemeFn });

  const setTheme = async (mode: ThemeMode) => {
    const [error] = await setThemeMutation.mutateAsync({
      type: PreferencesType.UI,
      properties: { theme: mode }
    });

    if (error) return toast.error(getErrorMessage(error));
    useProfileStore.setState((state) => ({ preferences: { ...state.preferences, theme: mode } }));
  };

  const isDark = useProfileStore((state) => state.preferences.theme === ThemeMode.Dark);

  return { setTheme, isDark };
};

export default useTheme;
