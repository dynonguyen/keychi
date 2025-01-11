// https://ui.shadcn.com/docs/components/input

import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  'keychi-input flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      size: {
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

export type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    ref?: React.Ref<HTMLInputElement>;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };

export const Input = (props: InputProps) => {
  const { className, size, startIcon, endIcon, ref, ...others } = props;

  return (
    <div className="keychi-input-root relative w-full">
      {startIcon && <div className="absolute inset-y-0 left-0 flex items-center pl-3 [&>*]:size-4">{startIcon}</div>}

      <input
        className={cn(inputVariants({ size, className }), {
          'pl-10': Boolean(startIcon),
          'pr-10': Boolean(endIcon)
        })}
        ref={ref}
        {...others}
      />

      {endIcon && <div className="absolute inset-y-0 right-0 flex items-center pr-3 [&>*]:size-4">{endIcon}</div>}
    </div>
  );
};

export default Input;
