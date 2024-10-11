import { useRouteError } from 'react-router-dom';

const ServerErrorPage = ({ error }: { error?: string | object }) => {
  const routeError = useRouteError();

  routeError && console.error('Server route error at route: ', routeError);
  error && console.error('Server error page: ', error);

  // TODO: Implement server error page
  return <div>Hello</div>;
};

export default ServerErrorPage;
