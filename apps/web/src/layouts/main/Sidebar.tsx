import { APP_NAME } from '@keychi/shared/constants';
import { EnumValue } from '@keychi/shared/types';
import clsx from 'clsx';
import { pick } from 'lodash-es';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button, Flex, FlexProps } from '../../components/ui';
import Divider from '../../components/ui/Divider';
import Tooltip from '../../components/ui/Tooltip';
import Typography from '../../components/ui/Typography';
import UserAvatar from '../../components/UserAvatar';
import { VaultFilterKey, VaultFilterType } from '../../constants/common';
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
  const { t } = useTranslation();

  return (
    <Tooltip title={t(open ? 'common.collapseSidebar' : 'common.expandSidebar')} placement="right">
      <Button variant="outline" size="icon" className="size-8 shrink-0 rounded-full" onClick={toggle}>
        <span
          className={clsx(
            'icon size-4 text-foreground-500',
            open ? 'msi-keyboard-double-arrow-left-rounded' : 'msi-keyboard-double-arrow-right-rounded'
          )}
        />
      </Button>
    </Tooltip>
  );
};

const Logo = () => {
  const open = useSidebarStore((state) => state.open);

  if (!open) {
    return (
      <div className="rounded-full size-8 shrink-0 overflow-hidden group">
        <img className="size-full group-hover:hidden" src={getAssetUrl('img/logo.svg')} />
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity">
          <SidebarToggler />
        </div>
      </div>
    );
  }

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

  const renderItemWithTooltip = () => {
    return open ? (
      renderItem()
    ) : (
      <Tooltip title={label} placement="right">
        {renderItem()}
      </Tooltip>
    );
  };

  return to ? <Link to={to}>{renderItemWithTooltip()}</Link> : renderItemWithTooltip();
};

const SidebarMenu = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { type } = useSafeSearchParams<Record<EnumValue<VaultFilterKey>, VaultFilterType>>();

  const menu: SidebarItemProps[] = [
    {
      icon: 'msi-key-vertical-outline-rounded -rotate-45',
      activeIcon: 'msi-key-vertical-rounded -rotate-45',
      label: t('common.vault_other'),
      to: PATH.VAULTS,
      active: (pathname === PATH.VAULTS || pathname === PATH.HOME) && !Object.values(VaultFilterType).includes(type)
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
      to: `${PATH.VAULTS}?${VaultFilterKey.Type}=${VaultFilterType.Favorite}`,
      active: pathname === PATH.VAULTS && type === VaultFilterType.Favorite
    },
    {
      icon: 'msi-delete-outline-rounded',
      activeIcon: 'msi-delete-rounded',
      label: t('common.trash'),
      to: `${PATH.VAULTS}?${VaultFilterKey.Type}=${VaultFilterType.Trash}`,
      active: pathname === PATH.VAULTS && type === VaultFilterType.Trash
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
        <Tooltip title={open ? '' : name} placement="right">
          <UserAvatar />
        </Tooltip>

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
      <Button className={clsx('my-6 rounded-lg', !open && 'size-8')} size={open ? 'sm' : 'icon'}>
        <span className={clsx('icon msi-add-2-rounded', 'size-4')}></span>
        {open && <Typography variant="mdSemiBold">{t('common.newItem')}</Typography>}
      </Button>
    </React.Fragment>
  );
};

export const Sidebar = () => {
  const open = useSidebarStore((state) => state.open);

  return (
    <Flex
      stack
      className="px-4 py-2 h-full overflow-y-auto overflow-x-hidden"
      style={{
        height: 'calc(100% - 1.5rem)',
        width: open ? SIDEBAR_WIDTH[1] : SIDEBAR_WIDTH[0],
        transition: 'width 0.15s'
      }}
    >
      <Flex className="justify-between">
        <Logo />
        {open && <SidebarToggler />}
      </Flex>

      <NewButton />

      <SidebarMenu />

      <div className="mt-auto">
        <Account />
      </div>
    </Flex>
  );
};

export default Sidebar;
