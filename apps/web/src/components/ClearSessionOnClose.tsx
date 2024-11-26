import React from 'react';
import { useAuthStore } from '../stores/auth';

/**  Logout user session in auth service when the tab is closed */
export const ClearSessionOnClose = () => {
  React.useEffect(() => {
    window.onbeforeunload = () => {
      useAuthStore.getState().logout();
      return null;
    };
  }, []);

  return null;
};

export default ClearSessionOnClose;
