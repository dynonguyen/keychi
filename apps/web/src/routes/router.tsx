import { LoadModule } from '@keychi/shared/react-web/components';
import React from 'react';
import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import LockPageDetector from '../components/LockPageDetector';
import { PATH } from '../constants/path';
import AuthGuard from '../guards/AuthGuard';
import LoginGuard from '../guards/LoginGuard';
import MainLayout from '../layouts/main';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';

const HomePage = React.lazy(() => import('../pages/HomePage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const LockPage = React.lazy(() => import('../pages/LockPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'));

// -----------------------------
const protectedRoutes: RouteObject = {
  errorElement: <ServerErrorPage />,
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [{ path: PATH.HOME, element: <HomePage /> }]
};

const authRoutes: RouteObject = {
  errorElement: <ServerErrorPage />,
  element: (
    <LoadModule>
      <LoginGuard>
        <Outlet />
      </LoginGuard>
    </LoadModule>
  ),
  children: [
    { path: PATH.LOGIN, element: <LoginPage /> },
    { path: PATH.REGISTER, element: <RegisterPage /> }
  ]
};

const publicRoutes: RouteObject = {
  errorElement: <ServerErrorPage />,
  element: (
    <LoadModule>
      <Outlet />
    </LoadModule>
  ),
  children: [{ path: PATH.LOCK, element: <LockPage /> }]
};

export const router = createBrowserRouter([
  {
    element: <LockPageDetector />,
    children: [protectedRoutes, authRoutes]
  },
  publicRoutes,
  { path: '*', element: <NotFoundPage /> }
]);
