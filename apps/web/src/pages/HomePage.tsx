import { Button } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import ThemeController from '../components/ThemeController';
import usePageTitle from '../hooks/usePageTitle';

export const HomePage = () => {
  const { t } = useTranslation();

  usePageTitle(t('pageTitle.home'));
  return (
    <div>
      <p className="text-xl">Home page</p>
      <Button variant="solid" color="primary">
        Hello
      </Button>
      <ThemeController />
    </div>
  );
};

export default HomePage;
