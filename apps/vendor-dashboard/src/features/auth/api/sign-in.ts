import { publicApi } from '@/api/api-client';
import { getVendorQueryOptions } from '@/api/user/get-vendor';
import { client } from '@/configs/client';
import { server } from '@/configs/server';
import { commonValidations } from '@/lib/commonValidation';
import { useAuthActions } from '@/store/auth-store';
import type { ApiResponse } from '@/types/api';
import type { Vendor } from '@/types/vendor';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { z } from 'zod';

export const signInSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type SignInInput = z.infer<typeof signInSchema>;

export async function signInWithEmailAndPassWord(data: SignInInput): Promise<
  ApiResponse<{
    accessToken: string;
    vendor: Vendor;
  }>
> {
  return publicApi.post(server.path.auth.signIn, data);
}

export function useSignInMutation() {
  const queryClient = useQueryClient();
  const { createSession } = useAuthActions();
  const router = useRouter();
  return useMutation({
    mutationFn: signInWithEmailAndPassWord,
    onSuccess: async (response) => {
      createSession(response.data.accessToken, response.data.vendor.id);
      queryClient.setQueryData(getVendorQueryOptions().queryKey, response.data.vendor);
      router.navigate({ to: client.path.root, replace: true });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
