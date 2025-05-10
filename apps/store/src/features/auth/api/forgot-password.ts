import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import type { ApiResponse } from '@/types/api';
import type { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

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

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
