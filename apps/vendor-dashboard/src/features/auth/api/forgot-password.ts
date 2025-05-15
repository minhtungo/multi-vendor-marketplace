import { publicApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { commonValidations } from '@/lib/commonValidation';
import type { ApiResponse } from '@/types/api';
import type { Vendor } from '@/types/vendor';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: commonValidations.email,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export async function forgotPassword(data: ForgotPasswordInput): Promise<
  ApiResponse<{
    accessToken: string;
    vendor: Vendor;
  }>
> {
  return publicApi.post(server.path.auth.forgotPassword, data);
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}
