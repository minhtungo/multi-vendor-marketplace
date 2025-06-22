import { publicApi } from '@/api/api-client';
import { api } from '@/configs/server';
import { commonValidations } from '@/lib/commonValidation';
import type { ApiResponse } from '@repo/types/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod/v4';

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
  return publicApi.post(api.auth.resetPassword, resetPasswordData);
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
