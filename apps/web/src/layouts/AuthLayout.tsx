import { APP_NAME } from '@keychi/shared/constants';
import { ReactChildren } from '@keychi/shared/types';
import React from 'react';
import { Flex } from '../components/ui';
import Typography from '../components/ui/Typography';
import { getAssetUrl } from '../utils/get-asset';

export const AuthLayout = (props: ReactChildren) => {
  const { children } = props;
  const ref = React.useRef<HTMLElement>(null);

  return (
    <Flex className="w-screen h-screen overflow-auto justify-between" ref={ref}>
      <Flex stack className="flex-grow p-6 size-full">
        <Flex center className="gap-2 my-8">
          <img className="size-8" src={getAssetUrl('img/logo.svg')} alt="Logo" />
          <Typography variant="xlMedium">{APP_NAME}</Typography>
        </Flex>

        <div className="flex-grow">{children}</div>

        <Typography variant="smRegular" className="text-center mt-auto text-foreground-500">
          ©2025 Keychi
        </Typography>
      </Flex>

      {/* Background cover */}
      <div className="w-[640px] h-full shrink-0 p-6 hidden lg:block">
        <div
          className="size-full bg-cover rounded-2xl"
          style={{ backgroundImage: `url(${getAssetUrl('img/login-background.png')})` }}
        ></div>
      </div>
    </Flex>
  );
};

export default AuthLayout;
