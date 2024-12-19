import { Outlet } from 'react-router-dom';
import LoadModule from '../../components/LoadModule';

export const MainLayout = () => {
  return (
    <LoadModule fallback={null} suspense={null}>
      <Outlet />
    </LoadModule>
  );
};

export default MainLayout;
