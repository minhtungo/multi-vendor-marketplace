import { publicApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { commonValidations } from '@/lib/commonValidation';
import type { ApiResponse } from '@/types/api';
import type { User } from '@/types/vendor';
import { useMutation } from '@tanstack/react-query';
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
  return publicApi.post(server.path.auth.signUp, parsedData);
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: signUpWithEmailAndPassWord,
  });
}
