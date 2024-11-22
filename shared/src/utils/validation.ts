import { z } from 'zod';

export function isEmail(email?: string): boolean {
  if (!email) return false;

  return z.string().email().safeParse(email).success;
}
