import { TFunction } from '@keychi/shared/types';
import { z } from 'zod';

export const loginSchema = (t: TFunction) => {
  return z.object({
    email: z
      .string()
      .trim()
      .email({ message: t('validation.email') })
      .min(1, { message: t('validation.required') }),
    password: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
  });
};
