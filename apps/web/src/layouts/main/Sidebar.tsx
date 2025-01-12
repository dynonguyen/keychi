import { APP_NAME } from '@keychi/shared/constants';
import { EnumValue } from '@keychi/shared/types';
import clsx from 'clsx';
import { pick } from 'lodash-es';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button, Flex, FlexProps } from '../../components/ui';
import Divider from '../../components/ui/Divider';
import Typography from '../../components/ui/Typography';
import UserAvatar from '../../components/UserAvatar';
import { VaultFilterKey } from '../../constants/common';
import { PATH } from '../../constants/path';
import useSafeSearchParams from '../../hooks/useSafeSearchParams';
import { useAuthStore } from '../../stores/auth';
import { useProfileStore } from '../../stores/profile';
import { useSidebarStore } from '../../stores/sidebar';
import { getAssetUrl } from '../../utils/get-asset';

type SidebarItemProps = {
  label: string;
  icon: string;
  activeIcon?: string;
  to?: string;
  active?: boolean;
  slotProps?: { item?: FlexProps };
};

const SIDEBAR_WIDTH = [64, 284];

const SidebarToggler = () => {
  const { open, toggle } = useSidebarStore();

  return (
    <Button variant="outline" size="icon" className="size-8 shrink-0 rounded-full" onClick={toggle}>
      <span
        className={clsx(
          'icon size-4 text-foreground-500',
          open ? 'msi-keyboard-double-arrow-left-rounded' : 'msi-keyboard-double-arrow-right-rounded'
        )}
      />
    </Button>
  );
};

const Logo = () => {
  const open = useSidebarStore((state) => state.open);

  if (!open) return null;

  return (
    <Link to={PATH.HOME}>
      <Flex className="gap-3">
        <img className="size-8" src={getAssetUrl('img/app-logo.svg')} />
        <Typography variant="lgSemiBold" className="text-foreground-700">
          {APP_NAME}
        </Typography>
      </Flex>
    </Link>
  );
};

const SidebarItem = (props: SidebarItemProps) => {
  const { icon, activeIcon, label, to, active, slotProps } = props;
  const open = useSidebarStore((state) => state.open);

  // TODO: Implement Tooltip & show it when the sidebar is collapsed
  const renderItem = () => {
    return (
      <Flex
        {...slotProps?.item}
        className={clsx(
          'gap-2 cursor-pointer text-foreground-600 transition-colors hover:text-primary-500',
          {
            'text-primary-500': active,
            'justify-center size-8': !open
          },
          slotProps?.item?.className
        )}
      >
        <span className={clsx('icon size-6 shrink-0', active ? activeIcon : icon)}></span>
        {open && <Typography variant={active ? 'smSemiBold' : 'smMedium'}>{label}</Typography>}
      </Flex>
    );
  };

  return to ? <Link to={to}>{renderItem()}</Link> : renderItem();
};

const SidebarMenu = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { trash, favorite } = useSafeSearchParams<Record<EnumValue<VaultFilterKey>, boolean>>({
    transform: {
      trash: (value) => value === 'true',
      favorite: (value) => value === 'true'
    }
  });

  const menu: SidebarItemProps[] = [
    {
      icon: 'msi-key-vertical-outline-rounded -rotate-45',
      activeIcon: 'msi-key-vertical-rounded -rotate-45',
      label: t('common.vault_other'),
      to: PATH.VAULTS,
      active: (pathname === PATH.VAULTS || pathname === PATH.HOME) && !trash && !favorite
    },
    {
      icon: 'msi-shield-lock-outline-rounded',
      activeIcon: 'msi-shield-lock-rounded',
      label: 'TOPT',
      to: PATH.TOTP
    },
    {
      icon: 'msi-favorite-outline-rounded',
      activeIcon: 'msi-favorite-rounded',
      label: t('common.favorite_other'),
      to: `${PATH.VAULTS}?${VaultFilterKey.Favorite}=true`,
      active: pathname === PATH.VAULTS && favorite
    },
    {
      icon: 'msi-delete-outline-rounded',
      activeIcon: 'msi-delete-rounded',
      label: t('common.trash'),
      to: `${PATH.VAULTS}?${VaultFilterKey.Trash}=true`,
      active: pathname === PATH.VAULTS && trash
    },
    {
      icon: 'msi-build-outline-rounded',
      activeIcon: 'msi-build-rounded',
      label: t('common.tool_other'),
      to: PATH.TOOLS
    },
    {
      icon: 'msi-settings-outline-rounded',
      activeIcon: 'msi-settings-rounded',
      label: t('common.setting_other'),
      to: PATH.SETTINGS
    }
  ];

  const withActive = (menu: SidebarItemProps[]): SidebarItemProps[] => {
    return menu.map((item) => ({ ...item, active: item.active !== undefined ? item.active : pathname === item.to }));
  };

  return (
    <Flex stack className="gap-4">
      {withActive(menu).map((item) => (
        <SidebarItem key={item.to} {...item} />
      ))}
    </Flex>
  );
};

const Account = () => {
  const { t } = useTranslation();

  const open = useSidebarStore((state) => state.open);
  const { name, email, lock } = useProfileStore((state) => pick(state, ['name', 'email', 'lock']));
  const logout = useAuthStore((state) => state.logout);

  return (
    <Flex stack className="gap-4">
      <SidebarItem
        icon="msi-lock-outline"
        label={t('common.lockNow')}
        slotProps={{ item: { onClick: () => lock() } }}
      />
      <SidebarItem
        icon="msi-logout-rounded"
        label={t('common.logout')}
        slotProps={{ item: { className: '!text-error-600', onClick: () => logout() } }}
      />

      <Divider />

      <Flex className="gap-2">
        <UserAvatar title={name} />

        {open && (
          <Flex stack>
            <Typography variant="smMedium" className="text-foreground-700 line-clamp-1">
              {name}
            </Typography>
            <Typography variant="xsRegular" className="text-foreground-500 line-clamp-1">
              {email}
            </Typography>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

const NewButton = () => {
  const open = useSidebarStore((state) => state.open);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Button className={clsx('my-6 rounded-xl', !open && 'size-8')} size={open ? 'md' : 'icon'}>
        <span className={clsx('icon msi-add-2-rounded', open ? 'size-5' : 'size-4')}></span>
        {open && <Typography variant="mdSemiBold">{t('common.newItem')}</Typography>}
      </Button>
    </React.Fragment>
  );
};

export const Sidebar = () => {
  const open = useSidebarStore((state) => state.open);

  return (
    <div className="h-full shrink-0">
      <div className="m-3 h-full shrink-0">
        <Flex
          stack
          className="p-4 border border-divider rounded-2xl overflow-y-auto overflow-x-hidden"
          style={{
            height: 'calc(100% - 1.5rem)',
            width: open ? SIDEBAR_WIDTH[1] : SIDEBAR_WIDTH[0],
            transition: 'width 0.15s'
          }}
        >
          <Flex className="justify-between">
            <Logo />
            <SidebarToggler />
          </Flex>

          <NewButton />

          <SidebarMenu />

          <div className="mt-auto">
            <Account />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Sidebar;
