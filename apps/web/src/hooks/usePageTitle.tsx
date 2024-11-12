import { APP_NAME } from '@shared/constants';
import React from 'react';

export const usePageTitle = (title?: string) => {
  React.useEffect(() => {
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
  }, [title]);

  return null;
};

export default usePageTitle;
