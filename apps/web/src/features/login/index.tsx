import { Button, Input } from '@nextui-org/react';
import { Flex } from '@shared/components/react';
import { ENDPOINT, LS_KEY } from '@shared/constants';
import { KdfParams, LoginReqDto, LoginRespDto } from '@shared/types';
import { Cipher, getErrorMessage } from '@shared/utils';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/path';
import { mutation } from '../../libs/query-client';

const login = mutation<LoginRespDto, LoginReqDto>(ENDPOINT.POST_LOGIN);
// const preLogin = mutation<PreLoginRespDto, PreLoginReqDto>(ENDPOINT.POST_PRE_LOGIN);

// TODO: Implement login form
export const Login = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({ mutationFn: login });
  // const preLoginMutation = useMutation({ mutationFn: preLogin });

  const { register, getValues } = useForm<LoginReqDto>({
    defaultValues: { email: 'dyno@email.com', password: '1234' }
  });

  const handleLogin = async () => {
    const { email, password } = getValues();
    // const [preLoginError, preLoginResp] = await preLoginMutation.mutateAsync({ email });

    // if (preLoginError) {
    //   return toast.error(getErrorMessage(preLoginError));
    // }

    // const { kdfAlgorithm, kdfIterations, kdfMemory, kdfParallelism } = preLoginResp.data;
    const cipher = new Cipher({
      email,
      masterPwd: password,
      kdfParams: {} as KdfParams
    });
    const authPwd = await cipher.getAuthenticationPwd();

    const [error, response] = await loginMutation.mutateAsync({ email, password: authPwd });

    if (error) {
      return toast.error(getErrorMessage(error));
    }

    localStorage.setItem(LS_KEY.ACCESS_TOKEN, response.data.accessToken);
    localStorage.setItem(LS_KEY.REFRESH_TOKEN, response.data.refreshToken);

    toast.success('Login successfully');
    navigate(PATH.HOME);
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
      <Link className="text-blue-400" to={PATH.REGISTER}>
        Register
      </Link>
    </div>
  );
};

export default Login;
