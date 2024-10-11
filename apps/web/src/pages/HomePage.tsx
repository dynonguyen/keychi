import { useTranslation } from 'react-i18next';
import usePageTitle from '../hooks/usePageTitle';

export const HomePage = () => {
  const { t } = useTranslation();

  usePageTitle(t('pageTitle.home'));

  return <div>Home page</div>;
};

export default HomePage;
