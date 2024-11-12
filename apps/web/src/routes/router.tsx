import { LoadModule } from '@shared/components/react';
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { PATH } from '../constants/path';
import AuthGuard from '../guards/AuthGuard';
import LoginGuard from '../guards/LoginGuard';
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
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [{ path: PATH.HOME, element: <HomePage /> }]
  },

  // Public routes
  {
    errorElement: <ServerErrorPage />,
    element: (
      <LoadModule>
        <Outlet />
      </LoadModule>
    ),
    children: [
      {
        path: PATH.LOGIN,
        element: (
          <LoginGuard>
            <LoginPage />
          </LoginGuard>
        )
      }
    ]
  },

  // Not found
  { path: '*', element: <NotFoundPage /> }
]);
