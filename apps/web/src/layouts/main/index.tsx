import { LoadModule } from '@shared/react-web/components';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <LoadModule fallback={null} suspense={null}>
      <Outlet />
    </LoadModule>
  );
};

export default MainLayout;
