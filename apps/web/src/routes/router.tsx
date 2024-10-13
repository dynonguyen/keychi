import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PATH } from '../constants/path';
import MainLayout from '../layouts/main';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';
import { getInitialTheme } from '../stores/keychiStore';

const HomePage = React.lazy(() => import('../pages/HomePage'));
document.documentElement.setAttribute('data-theme', getInitialTheme() ? 'light' : 'dark');
// -----------------------------
export const router = createBrowserRouter([
  {
    errorElement: <ServerErrorPage />,
    element: <MainLayout />,
    children: [{ path: PATH.HOME, element: <HomePage /> }]
  },

  { path: '*', element: <NotFoundPage /> }
]);
