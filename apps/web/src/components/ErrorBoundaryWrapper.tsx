import type { ReactChildren } from '@shared/types/react.type';
import { ErrorBoundary } from 'react-error-boundary';

export const ErrorBoundaryWrapper = (props: ReactChildren) => {
  const { children } = props;

  return <ErrorBoundary fallback={<div>Something went wrong</div>}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWrapper;
