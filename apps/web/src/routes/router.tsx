import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ServerErrorPage from '../pages/error/ServerErrorPage';
import { PATH } from '../constants/path';
import NotFoundErrorPage from '../pages/error/NotFoundErrorPage';

const HomePage = React.lazy(() => import('../pages/HomePage'));

// -----------------------------
export const router = createBrowserRouter([
  {
    errorElement: <ServerErrorPage />,
    children: [
      { path: PATH.HOME, element: <HomePage /> },
      { path: 'error', element: <ServerErrorPage /> }, // For testing, remove later
      { path: '*', element: <NotFoundErrorPage /> }
    ]
  }
]);
