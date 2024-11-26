import { SS_KEY } from '@shared/constants';
import { ReactChildren } from '@shared/types';
import { Navigate } from 'react-router-dom';
import { PATH } from '../constants/path';

/** Prevent authenticated users from accessing the login page */
export const LoginGuard = ({ children }: ReactChildren) => {
  if (sessionStorage.getItem(SS_KEY.ACCESS_TOKEN)) {
    return <Navigate to={PATH.HOME} />;
  }

  return children;
};

export default LoginGuard;
