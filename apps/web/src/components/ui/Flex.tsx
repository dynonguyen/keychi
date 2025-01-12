import clsx from 'clsx';
import React from 'react';

export type FlexProps = {
  component?: React.ElementType;
  wrap?: boolean;
  stack?: boolean;
  center?: boolean;
  ref?: React.Ref<HTMLElement>;
} & React.HTMLAttributes<HTMLElement>;

export const Flex = (props: FlexProps) => {
  const { component = 'div', wrap = false, stack = false, center, className, ref, ...others } = props;

  return React.createElement(component, {
    ref,
    className: clsx('flex', className, {
      'flex-wrap': wrap,
      'flex-col': stack,
      'items-center': !stack && !center,
      'items-center justify-center': center
    }),
    ...others
  });
};

export default Flex;
