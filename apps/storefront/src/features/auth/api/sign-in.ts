import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { tokenManager } from '@/lib/token';
import { commonValidations } from '@/lib/validations';
import type { ApiResponse } from '@/types/api';
import type { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const signInSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type SignInInput = z.infer<typeof signInSchema>;

export async function signInWithEmailAndPassWord(data: SignInInput): Promise<
  ApiResponse<{
    accessToken: string;
    user: User;
  }>
> {
  return api.post(server.path.auth.signIn, data, {
    skipAuth: true,
  });
}

export function useSignInMutation() {
  return useMutation({
    mutationFn: signInWithEmailAndPassWord,
    onSuccess: async (response) => {
      if (response.data?.accessToken) {
        await tokenManager.setToken(response.data.accessToken);
      }
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
