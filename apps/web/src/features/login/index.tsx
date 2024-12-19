import { ENDPOINT } from '@keychi/shared/constants';
import { KdfParams, LoginReqDto, LoginRespDto } from '@keychi/shared/types';
import { getErrorMessage } from '@keychi/shared/utils';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ThemeController from '../../components/ThemeController';
import { Button, Flex, Input } from '../../components/ui';
import { SS_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { mutation } from '../../libs/query-client';
import { useProfileStore } from '../../stores/profile';
import { Cipher } from '../../utils/cipher';

const login = mutation<LoginRespDto, LoginReqDto>(ENDPOINT.POST_LOGIN);

// TODO: Implement login form
export const Login = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({ mutationFn: login });
  const setMasterPwd = useProfileStore((state) => state.setMasterPwd);

  const { register, getValues } = useForm<LoginReqDto>({
    defaultValues: { email: 'test@email.com', password: '1234' }
  });

  const handleLogin = async () => {
    const { email, password } = getValues();

    const cipher = new Cipher({ email, masterPwd: password, kdfParams: {} as KdfParams });
    const authPwd = await cipher.getAuthenticationPwd();

    const [error, response] = await loginMutation.mutateAsync({ email, password: authPwd });

    if (error) return toast.error(getErrorMessage(error));

    sessionStorage.setItem(SS_KEY.ACCESS_TOKEN, response.data.accessToken);
    sessionStorage.setItem(SS_KEY.REFRESH_TOKEN, response.data.refreshToken);

    setMasterPwd(password);

    toast.success('Login successfully');
    navigate(PATH.HOME);
  };

  return (
    <div>
      <p>TODO: Implement login form</p>
      <ThemeController />
      <Flex className="gap-2" center>
        <Input placeholder="Email" type="text" {...register('email')} />
        <Input placeholder="Password" type="password" {...register('password')} />
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
