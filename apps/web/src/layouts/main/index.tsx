import { Outlet } from 'react-router-dom';
import LoadModule from '../../components/LoadModule';
import { Flex } from '../../components/ui';
import Sidebar from './Sidebar';

export const MainLayout = () => {
  return (
    <Flex className="w-screen h-screen overflow-hidden">
      <Sidebar />

      <div className="size-full flex-grow">
        <div className="m-3 h-full">
          <div
            className="overflow-auto size-full p-4 border border-divider rounded-2xl bg-background"
            style={{ height: 'calc(100% - 1.5rem)' }}
          >
            <LoadModule fallback={null} suspense={null}>
              <Outlet />
            </LoadModule>
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default MainLayout;
