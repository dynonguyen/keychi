import * as RadixPopover from '@radix-ui/react-popover';
import React from 'react';

export type PopoverProps = {
  disablePortal?: boolean;
  slotProps?: {
    portal?: React.ComponentProps<typeof RadixPopover.Portal>;
  };
};

export const Popover = (props: PopoverProps) => {
  const { disablePortal = false, slotProps } = props;

  const Wrapper = disablePortal ? React.Fragment : RadixPopover.Portal;

  return <Wrapper></Wrapper>;
};

export default Popover;
