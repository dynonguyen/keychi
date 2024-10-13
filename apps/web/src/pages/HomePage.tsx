import { useTranslation } from 'react-i18next';
import usePageTitle from '../hooks/usePageTitle';
import LightSwitch from '../components/LightSwitch';
import { useKeychiStore } from '../stores/keychiStore';

export const HomePage = () => {
  const { t } = useTranslation();
  const { getTheme, switchTheme } = useKeychiStore();

  usePageTitle(t('pageTitle.home'));
  return (
    <div>
      <p className="text-xl">Home page</p>
      <LightSwitch lightOn={getTheme()} switchTheme={switchTheme} />
    </div>
  );
};

export default HomePage;
