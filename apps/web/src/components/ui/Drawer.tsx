import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps, Drawer as VaulDrawer } from 'vaul';
import Button from './Button';
import Flex, { FlexProps } from './Flex';
import Typography from './Typography';

export type DrawerProps = {
  open?: boolean;
  disablePortal?: boolean;
  placement?: DialogProps['direction'];
  children?: React.ReactNode;
  title?: React.ReactNode;
  action?: React.ReactNode;
  content?: React.ReactNode;
  overlay?: boolean;
  size?: number;
  showCloseBtn?: boolean;
  onClose?(): void;
  onOpenChange?(open?: boolean): void;
  slotProps?: {
    root?: DialogProps;
    trigger?: React.ComponentProps<typeof VaulDrawer.Trigger>;
    portal?: React.ComponentProps<typeof VaulDrawer.Portal>;
    overlay?: React.ComponentProps<typeof VaulDrawer.Overlay>;
    content?: React.ComponentProps<typeof VaulDrawer.Content>;
    contentBody?: FlexProps;
    contentWrapper?: React.HTMLAttributes<HTMLDivElement>;
    title?: FlexProps;
    action?: React.HTMLAttributes<HTMLDivElement>;
  };
};

export const Drawer = (props: DrawerProps) => {
  const {
    open,
    disablePortal = false,
    overlay = true,
    size = 480,
    placement = 'right',
    title,
    action,
    content,
    children,
    showCloseBtn = true,
    onClose,
    onOpenChange,
    slotProps
  } = props;

  const { t } = useTranslation();

  const Wrapper = disablePortal ? React.Fragment : VaulDrawer.Portal;
  const isVertical = placement === 'top' || placement === 'bottom';

  return (
    <VaulDrawer.Root
      {...slotProps?.root}
      open={open}
      direction={placement}
      onClose={onClose}
      onOpenChange={onOpenChange}
    >
      {children && <VaulDrawer.Trigger {...slotProps?.trigger}> {children}</VaulDrawer.Trigger>}

      <Wrapper {...slotProps?.portal}>
        {overlay && (
          <VaulDrawer.Overlay
            {...slotProps?.overlay}
            className={clsx('fixed inset-0 bg-black/50', slotProps?.overlay?.className)}
          />
        )}

        <VaulDrawer.Content
          {...(size && { style: isVertical ? { height: size } : { width: size } })}
          {...slotProps?.content}
          className={clsx(
            'fixed bg-background',
            !overlay && 'shadow-lg',
            {
              'inset-y-0 right-0 max-h-screen max-w-full': placement === 'right',
              'inset-y-0 left-0 max-h-screen max-w-full': placement === 'left',
              'inset-x-0 bottom-0 max-h-full': placement === 'bottom',
              'inset-x-0 top-0 max-h-full': placement === 'top'
            },
            slotProps?.content?.className
          )}
        >
          <Flex stack {...slotProps?.contentBody} className={clsx('size-full', slotProps?.contentBody?.className)}>
            {title && (
              <Flex
                {...slotProps?.title}
                className={clsx(
                  'flex-shrink-0 justify-between p-2 border-b border-divider',
                  slotProps?.title?.className
                )}
              >
                <Typography variant="lgSemiBold">{title}</Typography>
                {onClose && (
                  <span
                    className="icon msi-close-rounded shrink-0 size-6 text-foreground-600 cursor-pointer"
                    onClick={onClose}
                  ></span>
                )}
              </Flex>
            )}

            <div
              {...slotProps?.contentWrapper}
              className={clsx('overflow-auto flex-grow', slotProps?.contentWrapper?.className)}
            >
              {content}
            </div>

            {(action || showCloseBtn) && (
              <div
                {...slotProps?.action}
                className={clsx('flex-shrink-0 p-2 border-t border-divider', slotProps?.action?.className)}
              >
                <Flex className="justify-between gap-2">
                  {showCloseBtn && onClose && (
                    <Button onClick={onClose} variant="outline" className="mr-2">
                      {t('common.close')}
                    </Button>
                  )}

                  {action}
                </Flex>
              </div>
            )}
          </Flex>
        </VaulDrawer.Content>
      </Wrapper>
    </VaulDrawer.Root>
  );
};

export default Drawer;
