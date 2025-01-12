import clsx from 'clsx';
import React from 'react';

export type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  vertical?: boolean;
};

export const Divider = (props: DividerProps) => {
  const { vertical, className, ...others } = props;
  return (
    <div
      className={clsx('keychi-divider bg-divider', vertical ? 'w-px h-full' : 'w-full h-px', className)}
      {...others}
    />
  );
};

export default Divider;
