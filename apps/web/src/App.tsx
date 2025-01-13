import { SHADCN_COLOR_PALETTE } from '@keychi/shared/constants';
import { generateCssVariables } from '@keychi/shared/utils/tailwind-helper';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ClearSessionOnClose from './components/ClearSessionOnClose';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';
import ThemeWatcher from './components/ThemeWatcher';
import ToastifyProvider from './components/ToastifyProvider';
import { queryClient } from './libs/query-client';
import { router } from './routes/router';

export const App = () => {
  React.useEffect(() => {
    const light = generateCssVariables(SHADCN_COLOR_PALETTE.light);
    const dark = generateCssVariables(SHADCN_COLOR_PALETTE.dark);

    const styleTag = document.createElement('style');
    styleTag.id = 'keychi-theme';

    const toCssVar = (palette: typeof light) => JSON.stringify(palette).replace(/"/g, '').replace(/,/g, ';');

    styleTag.innerHTML = `:root${toCssVar(light)} .dark${toCssVar(dark)}`;
    document.head.appendChild(styleTag);
  }, []);

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
