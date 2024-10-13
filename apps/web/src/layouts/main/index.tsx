import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <React.Suspense fallback={null}>
      <Outlet />
    </React.Suspense>
  );
};

export default MainLayout;
