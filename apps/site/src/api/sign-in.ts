import { env } from '@/configs/env';
import { server } from '@/configs/server';
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
  const response = await fetch(`${env.SERVER_URL}${server.path.auth.signIn}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return response.json();
}

export function useSignInMutation() {
  return useMutation({
    mutationFn: signInWithEmailAndPassWord,
    onSuccess: () => {
      //   queryClient.setQueryData(userQueryKey, data.user);
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
