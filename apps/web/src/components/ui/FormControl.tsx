import { ReactChildren } from '@keychi/shared/types';
import clsx from 'clsx';
import React from 'react';
import Flex from './Flex';
import Typography from './Typography';

export type FormControlProps = {
  name?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
} & ReactChildren;

export const FormControl = (props: FormControlProps) => {
  const { name, label, helperText, error, children, className, ref } = props;

  const handleFocusInput = () => {
    const input = document.querySelector(`input[name=${name}]`);
    (input as HTMLInputElement)?.focus();
  };

  return (
    <Flex
      component="div"
      stack
      className={clsx('keychi-form-control w-full gap-1', { '[&_input]:border-error': error }, className)}
      ref={ref}
    >
      <Typography
        className="keychi-form-control-label"
        component="label"
        variant="smMedium"
        // @ts-ignore
        htmlFor={name}
        onClick={handleFocusInput}
      >
        {label}
      </Typography>

      {children}

      <Typography
        className={clsx('keychi-form-control-helper-text text-foreground-500', { 'text-error': error })}
        component="span"
        variant="xsRegular"
      >
        {helperText}
      </Typography>
    </Flex>
  );
};

export default FormControl;
