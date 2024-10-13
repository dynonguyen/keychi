import React from 'react';
import { Outlet } from 'react-router-dom';
import { getInitialTheme } from '../../stores/keychiStore';

export const MainLayout = () => {
  document.documentElement.setAttribute('data-theme', getInitialTheme() ? 'light' : 'dark');

  return (
    <React.Suspense fallback={null}>
      <Outlet />
    </React.Suspense>
  );
};

export default MainLayout;
