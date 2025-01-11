import { zodResolver } from '@hookform/resolvers/zod';
import { ENDPOINT } from '@keychi/shared/constants';
import { KdfParams, RegisterReqDto } from '@keychi/shared/types';
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
import { PATH } from '../../../constants/path';
import { mutation } from '../../../libs/query-client';
import { Cipher } from '../../../utils/cipher';
import { registerSchema } from '../utils/validation';

const registerUser = mutation<string, RegisterReqDto>(ENDPOINT.POST_REGISTER);

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const registerMutation = useMutation({ mutationFn: registerUser });

  const schema = React.useMemo(() => registerSchema(t), [i18n.language]);
  const { register, handleSubmit, formState } = useForm<RegisterReqDto>({ resolver: zodResolver(schema) });
  const { errors } = formState;

  const handleRegister = async (form: RegisterReqDto) => {
    const { email, password } = form;
    const cipher = new Cipher({ masterPwd: password, email, kdfParams: {} as KdfParams });

    const authPwd = await cipher.getAuthenticationPwd();

    const [error] = await registerMutation.mutateAsync({ ...form, password: authPwd });

    if (error) {
      return toast.error(getErrorMessage(error));
    }

    toast.success(t('features.register.registerSuccess'));
    navigate(PATH.LOGIN);
  };

  return (
    <Flex stack className="gap-3 w-96 max-w-full" center component="form" onSubmit={handleSubmit(handleRegister)}>
      <FormControl label={t('common.fullname')} name="name" error={!!errors.name} helperText={errors.name?.message}>
        <Input
          size="lg"
          placeholder={t('common.fullname')}
          startIcon={<span className="icon msi-perm-contact-calendar-outline-rounded" />}
          autoFocus
          autoComplete="off"
          {...register('name')}
        />
      </FormControl>

      <FormControl label="Email" name="email" error={!!errors.email} helperText={errors.email?.message}>
        <Input
          size="lg"
          placeholder="Email"
          startIcon={<span className="icon msi-alternate-email-rounded" />}
          autoComplete="off"
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
        {t('common.signUp')}
      </Button>
    </Flex>
  );
};

export default RegisterForm;
