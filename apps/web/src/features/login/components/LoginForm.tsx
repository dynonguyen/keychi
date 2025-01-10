import { ENDPOINT } from '@keychi/shared/constants';
import { KdfAlgorithm, KdfParams, LoginReqDto, LoginRespDto } from '@keychi/shared/types';
import { getErrorMessage } from '@keychi/shared/utils';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Flex, Input } from '../../../components/ui';
import { SS_KEY } from '../../../constants/key';
import { PATH } from '../../../constants/path';
import { mutation } from '../../../libs/query-client';
import { useProfileStore } from '../../../stores/profile';
import { Cipher } from '../../../utils/cipher';

const login = mutation<LoginRespDto, LoginReqDto>(ENDPOINT.POST_LOGIN);

export const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginMutation = useMutation({ mutationFn: login });
  const setMasterPwd = useProfileStore((state) => state.setMasterPwd);

  const { register, getValues } = useForm<LoginReqDto>();

  const handleLogin = async () => {
    const { email, password } = getValues();

    const cipher = new Cipher({
      email,
      masterPwd: password,
      kdfParams: { kdfAlgorithm: KdfAlgorithm.Argon2 } as KdfParams
    });
    const authPwd = await cipher.getAuthenticationPwd();

    const [error, response] = await loginMutation.mutateAsync({ email, password: authPwd });

    if (error) return toast.error(getErrorMessage(error));

    sessionStorage.setItem(SS_KEY.ACCESS_TOKEN, response.data.accessToken);
    sessionStorage.setItem(SS_KEY.REFRESH_TOKEN, response.data.refreshToken);

    setMasterPwd(password);

    toast.success(t('features.login.loginSuccess'));
    navigate(PATH.HOME);
  };

  return (
    <Flex stack className="gap-2 w-80 max-w-full" center>
      <Input placeholder="Email" type="text" {...register('email')} />
      <Input placeholder="Password" type="password" {...register('password')} />
      <Button color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Flex>
  );
};

export default LoginForm;
