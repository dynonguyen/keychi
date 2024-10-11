import React, { ErrorInfo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type LoadModuleProps = Partial<React.ComponentProps<typeof ErrorBoundary>> & {
  suspense?: React.ReactNode;
  children?: React.ReactNode;
};

export const LoadModule = (props: LoadModuleProps) => {
  const { children, suspense = null, fallback = null, onError, ...boundaryProps } = props;

  const handleError = (error: Error, info: ErrorInfo) => {
    console.error('Load module error: ', error, info);
    onError?.(error, info);
  };

  return (
    // @ts-ignore
    <ErrorBoundary onError={handleError} fallback={fallback} {...boundaryProps}>
      <Suspense fallback={suspense}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default LoadModule;
