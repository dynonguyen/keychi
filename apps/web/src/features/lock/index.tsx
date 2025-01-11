import { isEmail } from '@keychi/shared/utils';
import { Navigate } from 'react-router-dom';
import { SS_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import AuthLayout from '../../layouts/AuthLayout';
import UnlockForm from './components/UnlockForm';
import WelcomeText from './components/WelcomeText';

export const Lock = () => {
  const loggedUser = sessionStorage.getItem(SS_KEY.LOGGED_USER) || '';

  if (!isEmail(loggedUser)) return <Navigate to={PATH.HOME} />;

  return (
    <AuthLayout>
      <WelcomeText email={loggedUser} />
      <UnlockForm />
    </AuthLayout>
  );
};

export default Lock;
