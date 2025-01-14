import { Language } from '@keychi/shared/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ThemeController from '../components/ThemeController';
import { Button } from '../components/ui';
import Flex from '../components/ui/Flex';
import usePageTitle from '../hooks/usePageTitle';
import { useAuthStore } from '../stores/auth';

export const VaultsPage = () => {
  const { t, i18n } = useTranslation();
  const logout = useAuthStore((state) => state.logout);
  const [open, setOpen] = React.useState(false);

  usePageTitle(t('pageTitle.home'));

  return (
    <Flex stack className="gap-2 items-start" wrap center>
      <div onClick={() => setOpen(!open)}>Open</div>

      <p className="text-xl">My Vaults</p>
      <div>
        <ThemeController />
      </div>
      <Button onClick={() => logout()}>Logout</Button>

      <Flex className="gap-2">
        <Button variant="outline" size="sm" onClick={() => i18n.changeLanguage(Language.En)}>
          English
        </Button>
        <Button variant="outline" size="sm" onClick={() => i18n.changeLanguage(Language.Vi)}>
          Vietnamese
        </Button>
      </Flex>
    </Flex>
  );
};

export default VaultsPage;
