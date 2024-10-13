import { useTranslation } from 'react-i18next';
import PageResult from '../components/PageResult';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <PageResult title={t('pageTitle.notFound')} imgSrc="not-found.svg" detail={t('notFound.description')} showAction />
  );
};

export default NotFoundPage;
