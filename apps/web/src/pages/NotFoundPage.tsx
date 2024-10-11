import { useTranslation } from 'react-i18next';
import usePageTitle from '../hooks/usePageTitle';

// TODO: Implement NotFoundPage
export const NotFoundPage = () => {
  const { t } = useTranslation();

  usePageTitle(t('pageTitle.notFound'));

  return <div>Not found</div>;
};

export default NotFoundPage;
