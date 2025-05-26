import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import { type ApiResponse } from '@repo/types/api';
import { type User } from '@repo/types/user';
import { z } from 'zod';

export const signUpSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export async function signUpWithEmailAndPassWord(data: SignUpInput): Promise<
  ApiResponse<{
    accessToken: string;
    user: User;
  }>
> {
  const parsedData = signUpSchema.parse(data);
  return api.post(server.path.auth.signUp, parsedData, {
    skipAuth: true,
  });
}
