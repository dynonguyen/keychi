import { Button, Input } from '@nextui-org/react';
import { Flex } from '@shared/components/react';
import { ENDPOINT, SS_KEY } from '@shared/constants';
import { KdfParams, LoginReqDto, LoginRespDto } from '@shared/types';
import { getErrorMessage, isEmail } from '@shared/utils';
import { Cipher } from '@shared/utils/web';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/path';
import { mutation } from '../../libs/query-client';
import { useAuthStore } from '../../stores/auth';
import { useProfileStore } from '../../stores/profile';

const login = mutation<LoginRespDto, LoginReqDto>(ENDPOINT.POST_LOGIN);

export const Lock = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({ mutationFn: login });
  const setMasterPwd = useProfileStore((state) => state.setMasterPwd);
  const logout = useAuthStore((state) => state.logout);

  const loggedUser = sessionStorage.getItem(SS_KEY.LOGGED_USER) || '';

  const { register, getValues } = useForm<LoginReqDto>({ defaultValues: { email: loggedUser!, password: '1234' } });

  const handleUnlock = async () => {
    const { email, password } = getValues();

    const cipher = new Cipher({ email, masterPwd: password, kdfParams: {} as KdfParams });
    const authPwd = await cipher.getAuthenticationPwd();

    const [error, response] = await loginMutation.mutateAsync({ email, password: authPwd });

    if (error) return toast.error(getErrorMessage(error));

    sessionStorage.setItem(SS_KEY.ACCESS_TOKEN, response.data.accessToken);
    sessionStorage.setItem(SS_KEY.REFRESH_TOKEN, response.data.refreshToken);

    setMasterPwd(password);

    navigate(PATH.HOME);
  };

  if (!isEmail(loggedUser)) return <Navigate to={PATH.HOME} />;

  return (
    <Flex stack center className="p-4">
      <h1 className="text-xl font-medium">Your vault is locked</h1>
      <Input type="password" label="Master password" placeholder="Enter your password" {...register('password')} />

      <Flex className="gap-4">
        <Button color="primary" onClick={handleUnlock}>
          Unlock
        </Button>

        <Button color="default" variant="bordered" onClick={() => logout()}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Lock;
