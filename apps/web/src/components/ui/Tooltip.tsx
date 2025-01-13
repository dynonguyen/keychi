import {
  Arrow,
  Content,
  Portal,
  Root,
  TooltipArrowProps,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipProps as TooltipRootProps,
  TooltipTriggerProps,
  Trigger
} from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import React from 'react';

export type TooltipProps = {
  children: React.ReactElement;
  title?: React.ReactNode;
  placement?: TooltipContentProps['side'];
  showArrow?: boolean;
  disablePortal?: boolean;
  slotProps?: {
    root?: TooltipRootProps;
    trigger?: TooltipTriggerProps;
    content?: TooltipContentProps;
    arrow?: TooltipArrowProps;
    portal?: TooltipPortalProps;
  };
};

export const Tooltip = (props: TooltipProps) => {
  const { placement = 'top', title, showArrow = false, disablePortal = false, children, slotProps } = props;

  if (!title) return children;

  const renderContent = () => {
    return (
      <Content
        side={placement}
        sideOffset={8}
        {...slotProps?.content}
        className={clsx(
          'bg-neutral-900 text-foreground-100 py-1 px-2 rounded-sm text-sm font-medium',
          slotProps?.content?.className
        )}
      >
        {title}
        {showArrow && <Arrow className="fill-neutral-900" {...slotProps?.arrow} />}
      </Content>
    );
  };

  return (
    <Root {...slotProps?.root}>
      <Trigger asChild {...slotProps?.trigger}>
        {children}
      </Trigger>

      {disablePortal ? renderContent() : <Portal {...slotProps?.portal}>{renderContent()}</Portal>}
    </Root>
  );
};

export default Tooltip;
