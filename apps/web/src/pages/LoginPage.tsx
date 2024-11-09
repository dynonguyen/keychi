import { useTranslation } from 'react-i18next';
import Login from '../features/login';
import usePageTitle from '../hooks/usePageTitle';

export const LoginPage = () => {
  const { t } = useTranslation();

  usePageTitle(t('pageTitle.login'));

  return <Login />;
};

export default LoginPage;
