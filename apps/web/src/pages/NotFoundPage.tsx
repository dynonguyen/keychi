import { RenderHTML } from '@shared/components/react/RenderHTML';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageResult from '../components/PageResult';
import { PATH } from '../constants/path';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <PageResult
      title={t('pageTitle.notFound')}
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

export default NotFoundPage;
