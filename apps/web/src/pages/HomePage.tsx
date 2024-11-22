import { Button } from '@nextui-org/react';
import { Flex } from '@shared/components/react';
import { useTranslation } from 'react-i18next';
import ThemeController from '../components/ThemeController';
import usePageTitle from '../hooks/usePageTitle';
import { useAuthStore } from '../stores/auth';
import { useProfileStore } from '../stores/profile';

export const HomePage = () => {
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const { name } = useProfileStore();

  usePageTitle(t('pageTitle.home'));

  return (
    <Flex className="gap-2 items-start" wrap center>
      <p className="text-xl">Home page</p>
      <div>
        <ThemeController />
      </div>
      <Button onClick={() => logout()}>Logout</Button>
      <div>User: {name}</div>
    </Flex>
  );
};

export default HomePage;
