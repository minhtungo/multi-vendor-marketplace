import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import type { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
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
  // return api.get(server.path.auth.resetPassword + '/verify/' + token, {
  //   skipAuth: true,
  // });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    success: true,
    status: 200,
    message: 'Token is valid',
    errors: [],
    data: {
      isValid: true,
    },
  };
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
