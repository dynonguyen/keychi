import { ReactChildren } from '@shared/types';
import { Navigate } from 'react-router-dom';
import GlobalLoading from '../components/GlobalLoading';
import { PATH } from '../constants/path';
import useGetMe from '../hooks/useGetMe';
import { useAuthStore } from '../stores/auth';

// Prevent authenticated users from accessing the login page
export const LoginGuard = ({ children }: ReactChildren) => {
  const { isAuthenticated, isInitiated, isLoading } = useAuthStore();

  useGetMe(!isInitiated && !isAuthenticated);

  if (isLoading) return <GlobalLoading />;

  if (isAuthenticated) return <Navigate to={PATH.HOME} />;

  return children;
};

export default LoginGuard;
