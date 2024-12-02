import { Button, Input } from '@nextui-org/react';
import { Flex } from '@shared/components/react';
import { ENDPOINT } from '@shared/constants';
import { KdfParams, RegisterReqDto } from '@shared/types';
import { getErrorMessage } from '@shared/utils';
import { Cipher } from '@shared/utils/web';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/path';
import { mutation } from '../../libs/query-client';

const registerUSer = mutation<string, RegisterReqDto>(ENDPOINT.POST_REGISTER);

// TODO: Implement register form
export const Register = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({ mutationFn: registerUSer });
  const { register, getValues } = useForm<RegisterReqDto>({
    defaultValues: { name: 'Dyno Nguyen', email: 'test@email.com', password: '1234', pwdHint: 'Con mèo con ngu ngốc' }
  });

  const handleRegister = async () => {
    const { email, password } = getValues();
    const cipher = new Cipher({ masterPwd: password, email, kdfParams: {} as KdfParams });

    const authPwd = await cipher.getAuthenticationPwd();

    const [error] = await registerMutation.mutateAsync({ ...getValues(), password: authPwd });

    if (error) {
      return toast.error(getErrorMessage(error));
    }

    toast.success('Register successfully');
    navigate(PATH.LOGIN);
  };

  return (
    <div>
      <p>TODO: Implement register form</p>
      <Flex className="gap-2" center>
        <Input type="text" {...register('email')} />
        <Input type="text" {...register('name')} />
        <Input type="password" {...register('password')} />
        <Button color="primary" onClick={handleRegister}>
          Sign up
        </Button>
      </Flex>
    </div>
  );
};

export default Register;
