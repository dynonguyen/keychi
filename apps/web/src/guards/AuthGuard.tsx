import { ReactChildren } from '@keychi/shared/types';
import { Navigate } from 'react-router-dom';
import GlobalLoading from '../components/GlobalLoading';
import { PATH } from '../constants/path';
import useGetMe from '../hooks/useGetMe';
import { useAuthStore } from '../stores/auth';

// Protect the route from unauthorized access
export const AuthGuard = ({ children }: ReactChildren) => {
  const { isLoading, isAuthenticated } = useAuthStore();

  useGetMe(!isAuthenticated);

  if (isLoading) return <GlobalLoading />;

  if (!isAuthenticated) return <Navigate to={PATH.LOGIN} />;

  return children;
};

export default AuthGuard;
