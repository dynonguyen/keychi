import { ENDPOINT } from '@keychi/shared/constants';
import { PreferencesReqDto, PreferencesType, ThemeMode } from '@keychi/shared/types';
import { getErrorMessage } from '@keychi/shared/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ApiResponse } from 'shared/src/types/common.type';
import { mutation } from '../libs/query-client';
import { useAuthStore } from '../stores/auth';
import { useProfileStore } from '../stores/profile';

const updateTheme = mutation<ApiResponse, PreferencesReqDto>(ENDPOINT.PATCH_PREFERENCES, undefined, 'patch');

export const useTheme = () => {
  const themeMutation = useMutation({ mutationFn: updateTheme });

  const isDark = useProfileStore((state) => state?.preferences?.theme === ThemeMode.Dark);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const setTheme = async (mode: ThemeMode) => {
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
