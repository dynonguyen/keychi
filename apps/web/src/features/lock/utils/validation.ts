import { TFunction } from '@keychi/shared/types';
import { z } from 'zod';

export const unlockSchema = (t: TFunction) => {
  return z.object({
    password: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
  });
};
