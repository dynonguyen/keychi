import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import ClearSessionOnClose from './components/ClearSessionOnClose';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';
import ThemeWatcher from './components/ThemeWatcher';
import ToastifyProvider from './components/ToastifyProvider';
import { queryClient } from './libs/query-client';
import { router } from './routes/router';

export const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ThemeWatcher />
          <ToastifyProvider />
          <ClearSessionOnClose />
        </QueryClientProvider>
      </NextUIProvider>
    </ErrorBoundaryWrapper>
  );
};

export default App;
