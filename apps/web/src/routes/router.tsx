import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { PATH } from '../constants/path';
import MainLayout from '../layouts/main';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';

const HomePage = React.lazy(() => import('../pages/HomePage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));

// -----------------------------
export const router = createBrowserRouter([
  // Protected routes
  {
    errorElement: <ServerErrorPage />,
    element: <MainLayout />,
    children: [{ path: PATH.HOME, element: <HomePage /> }]
  },

  // Public routes
  {
    errorElement: <ServerErrorPage />,
    element: <Outlet />,
    children: [{ path: PATH.LOGIN, element: <LoginPage /> }]
  },

  // Not found
  { path: '*', element: <NotFoundPage /> }
]);
