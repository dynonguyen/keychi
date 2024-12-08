import { ENDPOINT } from '@shared/constants';
import { PreferencesReqDto, PreferencesType, ThemeMode } from '@shared/types';
import { ApiResponse } from 'shared/src/types/common.type';

import { getErrorMessage } from '@shared/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { mutation } from '../libs/query-client';
import { useProfileStore } from '../stores/profile';

export const useSetTheme = () => {
  const { setTheme: setThemeStore } = useProfileStore();
  const setThemeFn = mutation<ApiResponse, PreferencesReqDto>(ENDPOINT.PATCH_PREFERENCES, undefined, 'patch');
  const setThemeMutation = useMutation({
    mutationFn: setThemeFn,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    }
  });

  const setTheme = async (mode: ThemeMode) => {
    await setThemeMutation.mutateAsync({
      type: PreferencesType.UI,
      properties: { theme: mode }
    });
    setThemeStore(mode);
  };

  return setTheme;
};

export default useSetTheme;
