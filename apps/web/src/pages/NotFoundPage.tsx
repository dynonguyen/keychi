import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

import usePageTitle from '../hooks/usePageTitle';
import { getImgUrl } from '@shared/utils/get-asset';
import { PATH } from '../constants/path';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  usePageTitle(t('pageTitle.notFound'));

  return (
    <div className="grid flex content-center justify-center align-center space-y-6 h-[80vh] md:h-screen">
      <div className="flex justify-center">
        <img src={getImgUrl('not-found.svg')} className="max-w-xs md:max-w-md" alt="Not Found" />
      </div>
      <div className="flex flex-col text-center max-w-screen-sm lg:max-w-screen-md px-4">
        <h1 className="py-6 text-2xl md:text-6xl font-medium">{t('notFound.title')}</h1>
        <p className="text-sm md:text-lg">
          {t('notFound.description')}
          <br />
          <Trans
            i18nKey="notFound.backHome"
            components={{
              toHome: <Link className="underline" to={PATH.HOME} />,
              toContact: <Link className="underline" to={PATH.HOME} /> // TODO: Change to contact page
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
