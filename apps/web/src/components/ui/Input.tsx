// https://ui.shadcn.com/docs/components/input

import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils/cn';

const inputVariants = cva('keychi-input', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: ''
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type InputProps = VariantProps<typeof inputVariants> &
  React.ComponentProps<'input'> & {
    ref?: React.Ref<HTMLInputElement>;
  };

export const Input = (props: InputProps) => {
  const { className, type, ref, ...others } = props;

  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...others}
    />
  );
};

export default Input;
