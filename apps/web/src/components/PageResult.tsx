import { getImgUrl } from '@shared/utils';
import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PATH } from '../constants/path';

type PageResultProps = {
  title: string;
  imgSrc: string;
  detail: React.ReactNode;
  showAction?: boolean;
};

export const PageResult = (props: PageResultProps) => {
  const { title, imgSrc, detail, showAction } = props;

  return (
    <div className="grid place-content-center space-y-6 h-[80vh] md:h-screen">
      <div className="flex justify-center">
        <img src={getImgUrl(imgSrc)} className="max-w-xs md:max-w-md" alt={`Error: ${title}`} />
      </div>

      <div className="flex flex-col text-center max-w-screen-sm lg:max-w-screen-md px-4">
        <h1 className="py-6 text-2xl md:text-6xl font-medium">{title}</h1>
        <p className="text-sm md:text-lg">{detail}</p>

        {showAction && (
          <p>
            <Trans
              i18nKey="pageResultAction"
              components={{
                toHome: <Link className="underline" to={PATH.HOME} />,
                toContact: <Link className="underline" to={PATH.ABOUT} />
              }}
            />
          </p>
        )}
      </div>
    </div>
  );
};

export default PageResult;
