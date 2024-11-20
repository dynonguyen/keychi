import { Button, Input } from '@nextui-org/react';
import { Flex } from '@shared/components/react';
import { ENDPOINT, LS_KEY } from '@shared/constants';
import { LoginReqDto, LoginRespDto } from '@shared/types';
import { getErrorMessage } from '@shared/utils';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/path';
import { mutation } from '../../libs/query-client';

const login = mutation<LoginRespDto, LoginReqDto>(ENDPOINT.POST_LOGIN);

// TODO: Implement login form
export const Login = () => {
  const loginMutation = useMutation({ mutationFn: login });
  const { register, getValues } = useForm<LoginReqDto>({
    defaultValues: { email: 'dyno@email.com', password: '1234' }
  });

  const handleLogin = async () => {
    const { email, password } = getValues();
    console.log(`☕ DYNO LOG ~ index.tsx:23 🥺`, email, password);

    const [error, response] = await loginMutation.mutateAsync(getValues());

    if (error) {
      return toast.error(getErrorMessage(error));
    }

    localStorage.setItem(LS_KEY.ACCESS_TOKEN, response.data.accessToken);
    localStorage.setItem(LS_KEY.REFRESH_TOKEN, response.data.refreshToken);

    location.href = PATH.HOME;
  };

  return (
    <div>
      <p>TODO: Implement login form</p>
      <Flex className="gap-2" center>
        <Input type="text" {...register('email')} />
        <Input type="password" {...register('password')} />
        <Button color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Flex>
    </div>
  );
};

export default Login;
