import { useRouteError } from 'react-router-dom';
import { RenderHTML } from '@shared/components/react/RenderHTML';
import { ErrorPageLayout } from './ErrorPageLayout';
import { useTranslation } from 'react-i18next';

export const ServerErrorPage = ({ error }: { error?: string | object }) => {
  const routeError = useRouteError();
  const { t } = useTranslation();

  routeError && console.error('Server route error at route: ', routeError);
  error && console.error('Server error page: ', error);

  return (
    <ErrorPageLayout
      title="Server Error"
      imgSrc="server-down.svg"
      detail={<RenderHTML html={t('serverError.description')} />}
    />
  );
};

export default ServerErrorPage;
