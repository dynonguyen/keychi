import React from 'react';
import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import LoadModule from '../components/LoadModule';
import LockPageDetector from '../components/LockPageDetector';
import { PATH } from '../constants/path';
import AuthGuard from '../guards/AuthGuard';
import LoginGuard from '../guards/LoginGuard';
import MainLayout from '../layouts/main';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';

const HomePage = React.lazy(() => import('../pages/HomePage'));
const VaultsPage = React.lazy(() => import('../pages/VaultsPage'));
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
  children: [
    { path: PATH.HOME, element: <HomePage /> },
    { path: PATH.VAULTS, element: <VaultsPage /> },
    { path: PATH.TOTP, element: <div>TOTP</div> },
    { path: PATH.TOOLS, element: <div>Tool</div> },
    { path: PATH.SETTINGS, element: <div>Settings</div> }
  ]
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
