import { RouterProvider } from 'react-router-dom';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';
import { router } from './routes/router';

export const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <RouterProvider router={router} />
    </ErrorBoundaryWrapper>
  );
};

export default App;
