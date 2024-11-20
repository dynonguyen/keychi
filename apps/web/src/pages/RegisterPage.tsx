import { useTranslation } from 'react-i18next';
import Register from '../features/register';
import usePageTitle from '../hooks/usePageTitle';

export const RegisterPage = () => {
  const { t } = useTranslation();

  usePageTitle(t('pageTitle.register'));

  return <Register />;
};

export default RegisterPage;
