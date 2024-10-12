import { Trans, useTranslation } from 'react-i18next';
import { RenderHTML } from '@shared/components/react/RenderHTML';
import ErrorPageLayout from './ErrorPageLayout';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/path';
import React from 'react';

export const NotFoundErrorPage = () => {
  const { t } = useTranslation();

  return (
    <ErrorPageLayout
      title={t('notFound.title')}
      imgSrc="not-found.svg"
      detail={
        <React.Fragment>
          <RenderHTML html={t('notFound.description')} />
          <Trans
            key="back-home"
            i18nKey="notFound.backHome"
            components={{
              toHome: <Link className="underline" to={PATH.HOME} />,
              toContact: <Link className="underline" to={PATH.HOME} /> // TODO: Change to contact page
            }}
          />
        </React.Fragment>
      }
    />
  );
};

export default NotFoundErrorPage;
