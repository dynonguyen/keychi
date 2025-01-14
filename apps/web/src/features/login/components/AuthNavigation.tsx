import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Tabs, { Tab } from '../../../components/ui/Tabs';
import { PATH } from '../../../constants/path';

export const AuthNavigation = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const items: Tab[] = [
    { label: t('common.signIn'), value: PATH.LOGIN, active: pathname.includes(PATH.LOGIN) },
    { label: t('common.signUp'), value: PATH.REGISTER, active: pathname.includes(PATH.REGISTER) }
  ];

  return (
    <Tabs
      tabs={items}
      size="lg"
      slotProps={{ root: { className: 'w-96' } }}
      onTabChange={(tab) => navigate(tab.value)}
    />
  );
};

export default AuthNavigation;
