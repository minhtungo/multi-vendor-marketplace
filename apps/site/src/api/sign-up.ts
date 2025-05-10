import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import type { ApiResponse } from '@/types/api';
import type { User } from '@/types/user';
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
  return api.post(server.path.auth.signUp, data);
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: signUpWithEmailAndPassWord,
  });
}
