import { zodResolver } from '@hookform/resolvers/zod';
import { ENDPOINT } from '@keychi/shared/constants';
import { KdfAlgorithm, KdfParams, LoginReqDto, LoginRespDto } from '@keychi/shared/types';
import { getErrorMessage } from '@keychi/shared/utils';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Flex, Input } from '../../../components/ui';
import FormControl from '../../../components/ui/FormControl';
import PasswordInput from '../../../components/ui/PasswordInput';
import { SS_KEY } from '../../../constants/key';
import { PATH } from '../../../constants/path';
import { mutation } from '../../../libs/query-client';
import { useProfileStore } from '../../../stores/profile';
import { Cipher } from '../../../utils/cipher';
import { loginSchema } from '../utils/validation';

const login = mutation<LoginRespDto, LoginReqDto>(ENDPOINT.POST_LOGIN);

export const LoginForm = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const loginMutation = useMutation({ mutationFn: login });
  const setMasterPwd = useProfileStore((state) => state.setMasterPwd);

  const schema = React.useMemo(() => loginSchema(t), [i18n.language]);
  const { register, handleSubmit, formState } = useForm<LoginReqDto>({
    resolver: zodResolver(schema)
  });

  const { errors } = formState;

  const handleLogin = async (form: LoginReqDto) => {
    const { email, password } = form;

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
    <Flex stack className="gap-3 w-96 max-w-full" center component="form" onSubmit={handleSubmit(handleLogin)}>
      <FormControl label="Email" name="email" error={!!errors.email} helperText={errors.email?.message}>
        <Input
          size="lg"
          placeholder="Email"
          autoFocus
          startIcon={<span className="icon msi-alternate-email-rounded" />}
          {...register('email')}
        />
      </FormControl>

      <FormControl
        label={t('common.password')}
        name="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      >
        <PasswordInput
          size="lg"
          placeholder={t('common.password')}
          startIcon={<span className="icon msi-lock-outline" />}
          {...register('password')}
        />
      </FormControl>

      <Button type="submit" className="w-full">
        {t('common.signIn')}
      </Button>
    </Flex>
  );
};

export default LoginForm;
