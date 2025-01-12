import { zodResolver } from '@hookform/resolvers/zod';
import { ENDPOINT } from '@keychi/shared/constants';
import { KdfParams, LoginReqDto, LoginRespDto } from '@keychi/shared/types';
import { getErrorMessage } from '@keychi/shared/utils';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Flex } from '../../../components/ui';
import FormControl from '../../../components/ui/FormControl';
import PasswordInput from '../../../components/ui/PasswordInput';
import { SS_KEY } from '../../../constants/key';
import { PATH } from '../../../constants/path';
import { mutation } from '../../../libs/query-client';
import { useAuthStore } from '../../../stores/auth';
import { useProfileStore } from '../../../stores/profile';
import { Cipher } from '../../../utils/cipher';
import { unlockSchema } from '../utils/validation';

const login = mutation<LoginRespDto, LoginReqDto>(ENDPOINT.POST_LOGIN);

type UnlockForm = Pick<LoginReqDto, 'password'>;

export const UnlockForm = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const loginMutation = useMutation({ mutationFn: login });
  const setMasterPwd = useProfileStore((state) => state.setMasterPwd);
  const logout = useAuthStore((state) => state.logout);

  const loggedUser = sessionStorage.getItem(SS_KEY.LOGGED_USER) || '';

  const schema = React.useMemo(() => unlockSchema(t), [i18n.language]);
  const { register, handleSubmit, formState } = useForm<UnlockForm>({
    resolver: zodResolver(schema)
  });

  const { errors } = formState;

  const handleUnlock = async (form: UnlockForm) => {
    const { password } = form;
    const email = loggedUser;

    const cipher = new Cipher({ email, masterPwd: password, kdfParams: {} as KdfParams });
    const authPwd = await cipher.getAuthenticationPwd();

    const [error, response] = await loginMutation.mutateAsync({ email, password: authPwd });

    if (error) return toast.error(getErrorMessage(error));

    sessionStorage.setItem(SS_KEY.ACCESS_TOKEN, response.data.accessToken);
    sessionStorage.setItem(SS_KEY.REFRESH_TOKEN, response.data.refreshToken);

    setMasterPwd(password);

    navigate(PATH.HOME);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Flex stack className="gap-3 w-96 max-w-full" center component="form" onSubmit={handleSubmit(handleUnlock)}>
      <FormControl
        label={t('common.password')}
        name="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      >
        <PasswordInput
          size="lg"
          autoFocus
          placeholder={t('common.password')}
          startIcon={<span className="icon msi-lock-outline" />}
          {...register('password')}
        />
      </FormControl>

      <Flex className="gap-4 w-full">
        <Button type="button" className="w-full" variant="outline" onClick={handleLogout}>
          {t('common.logout')}
        </Button>
        <Button className="w-full" type="submit">
          {t('common.unlock')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default UnlockForm;
