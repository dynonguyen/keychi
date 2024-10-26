import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';
import { router } from './routes/router';

export const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </ErrorBoundaryWrapper>
  );
};

export default App;
