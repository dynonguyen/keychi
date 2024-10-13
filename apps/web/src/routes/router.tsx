import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PATH } from '../constants/path';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';

const HomePage = React.lazy(() => import('../pages/HomePage'));

// -----------------------------
export const router = createBrowserRouter([
  {
    errorElement: <ServerErrorPage />,
    children: [
      { path: PATH.HOME, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
