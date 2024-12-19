import { ENDPOINT } from '@keychi/shared/constants';
import { KdfParams, RegisterReqDto } from '@keychi/shared/types';
import { getErrorMessage } from '@keychi/shared/utils';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Flex, Input } from '../../components/ui';
import { PATH } from '../../constants/path';
import { mutation } from '../../libs/query-client';
import { Cipher } from '../../utils/cipher';

const registerUSer = mutation<string, RegisterReqDto>(ENDPOINT.POST_REGISTER);

// TODO: Implement register form
export const Register = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({ mutationFn: registerUSer });
  const { register, getValues } = useForm<RegisterReqDto>({
    defaultValues: { name: 'Test User', email: 'test@email.com', password: '1234', pwdHint: 'Con mèo con ngu ngốc' }
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
        <Input placeholder="Email" type="text" {...register('email')} />
        <Input placeholder="Name" type="text" {...register('name')} />
        <Input placeholder="Password" type="password" {...register('password')} />
        <Button color="primary" onClick={handleRegister}>
          Sign up
        </Button>
      </Flex>
    </div>
  );
};

export default Register;
