import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import type { ApiResponse } from '@/types/api';
import type { User } from '@/types/user';
import { z } from 'zod';

export const signInSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type SignInInput = z.infer<typeof signInSchema>;

export async function signInWithEmailAndPassWord(data: SignInInput): Promise<
  ApiResponse<{
    accessToken: string;
    user: User;
  }>
> {
  return api.post(server.path.auth.signIn, data, {
    skipAuth: true,
  });
}
