import { ENDPOINT } from '@keychi/shared/constants';
import { UserProfile } from '@keychi/shared/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SS_KEY } from '../constants/key';
import { fetcher } from '../libs/query-client';
import { useAuthStore } from '../stores/auth';
import { useProfileStore } from '../stores/profile';

const getMe = fetcher<UserProfile>(ENDPOINT.GET_PROFILE);

export const useGetMe = (shouldGetMe?: boolean) => {
  const { setAuth } = useAuthStore();

  const {
    isFetching,
    data: profile,
    isError
  } = useQuery({
    queryKey: [ENDPOINT.GET_PROFILE],
    queryFn: getMe,
    staleTime: 0,
    enabled: shouldGetMe,
    refetchOnWindowFocus: false
  });

  React.useEffect(() => {
    if (shouldGetMe && isFetching) return setAuth({ isLoading: true });

    if (isError || !profile) return setAuth({ isLoading: false, isAuthenticated: false, isInitiated: true });

    if (profile) {
      sessionStorage.setItem(SS_KEY.LOGGED_USER, profile.email);

      setAuth({ isLoading: false, isAuthenticated: true, isInitiated: true });
      useProfileStore.setState(profile);
    }
  }, [shouldGetMe, isFetching, isError, Boolean(profile)]);
};

export default useGetMe;
