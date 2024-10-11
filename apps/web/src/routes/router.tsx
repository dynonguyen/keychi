import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ServerErrorPage from '../components/ServerErrorPage';
import { PATH } from '../constants/path';
import NotFoundPage from '../pages/NotFoundPage';

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
