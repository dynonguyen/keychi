import { isEmail } from '@shared/utils';
import { Navigate, Outlet } from 'react-router-dom';
import { SS_KEY } from '../constants/key';
import { PATH } from '../constants/path';
import { useProfileStore } from '../stores/profile';

export const LockPageDetector = () => {
  const masterPwd = useProfileStore((state) => state.masterPwd);

  // Check if user is logged in
  if (!masterPwd && isEmail(sessionStorage.getItem(SS_KEY.LOGGED_USER) || '')) {
    return <Navigate to={PATH.LOCK} />;
  }

  return <Outlet />;
};

export default LockPageDetector;
