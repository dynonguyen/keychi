import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import LoadModule from './LoadModule';
import { Button, ButtonProps, Flex } from './ui';
import Drawer from './ui/Drawer';
import Tabs, { Tab } from './ui/Tabs';
import Typography from './ui/Typography';

const NewFolderForm = React.lazy(() => import('../features/new-folder'));
const NewVaultForm = React.lazy(() => import('../features/new-vault'));

type NewItemButtonProps = {
  variant?: 'default' | 'icon';
  slotProps?: {
    button?: ButtonProps;
  };
};

export const NewItemButton = (props: NewItemButtonProps) => {
  const { variant = 'default', slotProps } = props;
  type FormType = 'folder' | 'vault';

  const { t } = useTranslation();
  const [openNew, setOpenNew] = React.useState(false);
  const [tab, setTab] = React.useState<FormType>('vault');

  const tabs: Array<Tab<FormType>> = [
    { label: t('common.folder_one'), value: 'folder', icon: 'msi-folder-outline-rounded' },
    { label: t('common.vault_one'), value: 'vault', icon: 'msi-key-vertical-outline-rounded -rotate-45' }
  ];

  const Form = match(tab)
    .with('folder', () => NewFolderForm)
    .with('vault', () => NewVaultForm)
    .exhaustive();

  const isIcon = variant === 'icon';

  return (
    <React.Fragment>
      <Button
        size={isIcon ? 'icon' : 'sm'}
        {...slotProps?.button}
        className={clsx('my-6 rounded-lg', isIcon && 'size-8', slotProps?.button?.className)}
        onClick={(ev) => {
          setOpenNew(true);
          slotProps?.button?.onClick?.(ev);
        }}
      >
        <span className={clsx('icon msi-add-2-rounded', 'size-4')}></span>
        {!isIcon && <Typography variant="mdSemiBold">{t('common.newItem')}</Typography>}
      </Button>

      <Drawer
        open={openNew}
        onClose={() => setOpenNew(false)}
        size={800}
        title={t('common.newItem')}
        content={
          <Flex stack className="p-4 gap-4">
            <Tabs value={tab} tabs={tabs} onTabChange={(tab) => setTab(tab.value)} />
            <LoadModule>{openNew && <Form />}</LoadModule>
          </Flex>
        }
      />
    </React.Fragment>
  );
};

export default NewItemButton;
