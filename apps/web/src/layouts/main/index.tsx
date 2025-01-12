import { Outlet } from 'react-router-dom';
import LoadModule from '../../components/LoadModule';
import { Flex } from '../../components/ui';
import Sidebar from './Sidebar';

export const MainLayout = () => {
  return (
    <Flex className="w-screen h-screen overflow-hidden">
      <Sidebar />

      <div className="overflow-auto w-full min-h-full">
        <LoadModule fallback={null} suspense={null}>
          <Outlet />
        </LoadModule>
      </div>
    </Flex>
  );
};

export default MainLayout;
