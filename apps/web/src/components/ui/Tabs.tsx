import { Any } from '@keychi/shared/types';
import clsx from 'clsx';
import React from 'react';
import Flex, { FlexProps } from './Flex';

export type Tab<V = Any> = { label: React.ReactNode; value: V; icon?: string; active?: boolean };
export type TabsProps = {
  tabs: Tab[];
  value?: unknown;
  slotProps?: { root?: FlexProps; tab?: React.HTMLAttributes<HTMLDivElement> };
  size?: 'sm' | 'md' | 'lg';
  renderTab?(tab: Tab, active?: boolean): React.ReactNode;
  onTabChange?(tab: Tab): void;
};

export const Tabs = (props: TabsProps) => {
  const { tabs = [], size = 'md', value, slotProps, renderTab, onTabChange } = props;

  const renderTabItem = (tab: Tab) => {
    if (renderTab) return renderTab(tab, tab.active || tab.value === value);

    return (
      <Flex className="gap-2">
        {tab.icon && <span className={clsx('icon size-5 shrink-0', tab.icon)}></span>}
        {tab.label}
      </Flex>
    );
  };

  return (
    <Flex
      {...slotProps?.root}
      className={clsx(
        'max-w-full p-1 rounded-xl bg-neutral-200 justify-between gap-1',
        {
          'h-8': size === 'sm',
          'h-10': size === 'md',
          'h-11': size === 'lg'
        },
        slotProps?.root?.className
      )}
    >
      {tabs.map((tab) => (
        <div
          {...slotProps?.tab}
          className={clsx(
            'flex items-center justify-center size-full text-sm rounded-lg w-full cursor-pointer',
            tab.active || tab.value === value
              ? 'font-semibold bg-neutral-50'
              : 'text-foreground-500 hover:bg-neutral-50 transition-colors',
            slotProps?.tab?.className
          )}
          onClick={(ev) => {
            onTabChange?.(tab);
            slotProps?.tab?.onClick?.(ev);
          }}
          key={tab.value}
        >
          {renderTabItem(tab)}
        </div>
      ))}
    </Flex>
  );
};

export default Tabs;
