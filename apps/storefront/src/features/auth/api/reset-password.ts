import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import { type ApiResponse } from '@repo/types/api';
import { z } from 'zod';

export const resetPasswordSchema = z.object({
  password: commonValidations.password,
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export async function resetPassword(data: ResetPasswordInput): Promise<
  ApiResponse<{
    password: string;
  }>
> {
  const resetPasswordData = resetPasswordSchema.parse(data);
  return api.post(server.path.auth.resetPassword, resetPasswordData, {
    skipAuth: true,
  });
}

export async function verifyResetPasswordToken(token: string): Promise<
  ApiResponse<{
    isValid: boolean;
  }>
> {
  return api.get(server.path.auth.resetPassword + '/verify/' + token, {
    skipAuth: true,
  });
}
