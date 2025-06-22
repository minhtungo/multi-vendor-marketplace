import { publicApi } from '@/api/api-client';
import { api } from '@/configs/server';
import { commonValidations } from '@/lib/commonValidation';
import type { ApiResponse } from '@repo/types/api';
import type { Vendor } from '@repo/types/vendor';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod/v4';

export const signUpSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
  name: z.string().min(1, 'Name is required'),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export async function signUpWithEmailAndPassWord(data: SignUpInput): Promise<
  ApiResponse<{
    accessToken: string;
    vendor: Vendor;
  }>
> {
  const parsedData = signUpSchema.parse(data);
  return publicApi.post(api.auth.signUp, parsedData);
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: signUpWithEmailAndPassWord,
  });
}
