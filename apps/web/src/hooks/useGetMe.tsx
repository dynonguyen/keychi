import { ENDPOINT } from '@shared/constants';
import { User } from '@shared/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetcher } from '../libs/query-client';
import { useAuthStore } from '../stores/auth';

const getMe = fetcher<User>(ENDPOINT.GET_PROFILE);

export const useGetMe = (shouldGetMe?: boolean) => {
  const { setAuth } = useAuthStore();
  const {
    isFetching,
    data: user,
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

    if (isError || !user) return setAuth({ isLoading: false, isAuthenticated: false, isInitiated: true });

    if (user) setAuth({ isLoading: false, isAuthenticated: true, isInitiated: true, ...user });
  }, [shouldGetMe, isFetching, isError, Boolean(user)]);
};

export default useGetMe;
