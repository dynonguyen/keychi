import { TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import ClearSessionOnClose from './components/ClearSessionOnClose';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';
import ThemeWatcher from './components/ThemeWatcher';
import ToastifyProvider from './components/ToastifyProvider';
import useGenerateCssVariable from './hooks/useGenerateCssVariable';
import { queryClient } from './libs/query-client';
import { router } from './routes/router';

export const App = () => {
  useGenerateCssVariable();

  return (
    <ErrorBoundaryWrapper>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
        <ThemeWatcher />
        <ToastifyProvider />
        <ClearSessionOnClose />
      </QueryClientProvider>
    </ErrorBoundaryWrapper>
  );
};

export default App;
