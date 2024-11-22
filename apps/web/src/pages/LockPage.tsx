import { useTranslation } from 'react-i18next';
import Lock from '../features/lock';
import usePageTitle from '../hooks/usePageTitle';

export const LockPage = () => {
  const { t } = useTranslation();

  usePageTitle(t('pageTitle.lock'));

  return <Lock />;
};

export default LockPage;
