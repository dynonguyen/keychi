import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';
import PageResult from '../components/PageResult';

export const ServerErrorPage = ({ error }: { error?: string | object }) => {
  const routeError = useRouteError();
  const { t } = useTranslation();

  routeError && console.error('Server route error at route: ', routeError);
  error && console.error('Server error page: ', error);

  return (
    <PageResult title={t('pageTitle.serverError')} imgSrc="server-down.svg" detail={t('serverError.description')} />
  );
};

export default ServerErrorPage;
