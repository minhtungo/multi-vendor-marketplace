import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import { type User } from '@repo/types/user';
import { z } from 'zod';
import { type ApiResponse } from '@repo/types/api';

export const forgotPasswordSchema = z.object({
  email: commonValidations.email,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export async function forgotPassword(data: ForgotPasswordInput): Promise<
  ApiResponse<{
    accessToken: string;
    user: User;
  }>
> {
  return api.post(server.path.auth.forgotPassword, data, {
    skipAuth: true,
  });
}
