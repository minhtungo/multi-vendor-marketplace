import { publicApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { commonValidations } from '@/lib/commonValidation';
import type { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const verifyUserSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
  name: z.string().min(1, 'Name is required'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type VerifyUserInput = z.infer<typeof verifyUserSchema>;

async function verifyUserWithOTP(data: VerifyUserInput): Promise<ApiResponse<null>> {
  return publicApi.post(server.path.auth.verifyUser, data);
}

export function useVerifyUserMutation() {
  return useMutation({
    mutationFn: verifyUserWithOTP,
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
