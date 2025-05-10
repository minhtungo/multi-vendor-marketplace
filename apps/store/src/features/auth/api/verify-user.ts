import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import type { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const verifyUserSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type VerifyUserInput = z.infer<typeof verifyUserSchema>;

async function verifyUserWithOTP(data: VerifyUserInput): Promise<ApiResponse<null>> {
  return api.put(server.path.auth.verifyUser, data, {
    skipAuth: true,
  });
}

export function useVerifyUserMutation() {
  return useMutation({
    mutationFn: verifyUserWithOTP,
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
