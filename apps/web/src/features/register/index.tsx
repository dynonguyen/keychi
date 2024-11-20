import { Button, Input } from '@nextui-org/react';
import { Flex } from '@shared/components/react';
import { ENDPOINT } from '@shared/constants';
import { RegisterReqDto } from '@shared/types';
import { getErrorMessage } from '@shared/utils';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/path';
import { mutation } from '../../libs/query-client';

const registerUSer = mutation<string, RegisterReqDto>(ENDPOINT.POST_REGISTER);

// TODO: Implement register form
export const Register = () => {
  const registerMutation = useMutation({ mutationFn: registerUSer });
  const { register, getValues } = useForm<RegisterReqDto>({
    defaultValues: { name: 'Dyno', email: 'dyno@email.com', password: '1234', pwdHint: 'Con mèo con ngu ngốc' }
  });

  const handleRegister = async () => {
    const [error, response] = await registerMutation.mutateAsync(getValues());

    console.log(`☕ DYNO LOG ~ index.tsx:24 🥺`, response);

    if (error) {
      return toast.error(getErrorMessage(error));
    }

    location.href = PATH.LOGIN;
  };

  return (
    <div>
      <p>TODO: Implement register form</p>
      <Flex stack className="gap-2" center>
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
