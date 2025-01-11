import clsx from 'clsx';
import React from 'react';
import Input, { InputProps } from './Input';

export const PasswordInput = (props: InputProps) => {
  const [showPwd, setShowPwd] = React.useState(false);

  return (
    <Input
      {...props}
      type={showPwd ? 'text' : 'password'}
      endIcon={
        <span
          className={clsx('cursor-pointer icon', showPwd ? 'msi-visibility-off-outline' : 'msi-visibility-outline')}
          onClick={() => setShowPwd((prev) => !prev)}
        />
      }
    />
  );
};

export default PasswordInput;
