import React from 'react';
import { useAuthStore } from '../stores/auth';

export const ClearSessionOnClose = () => {
  // Logout user session in auth service when the tab is closed
  React.useEffect(() => {
    window.onbeforeunload = () => {
      useAuthStore.getState().logout();
      return null;
    };
  }, []);

  return null;
};

export default ClearSessionOnClose;
