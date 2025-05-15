import { privateApi } from '@/api/api-client';
import { getUserQueryOptions } from '@/api/user/get-user';
import { client } from '@/configs/client';
import { server } from '@/configs/server';
import { useAuthActions } from '@/store/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';

export function signOut() {
  return privateApi.post(server.path.auth.signOut);
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const { clearSession } = useAuthActions();
  const router = useRouter();
  const location = useLocation();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      clearSession();
      queryClient.setQueryData(getUserQueryOptions().queryKey, undefined);
      router.navigate({
        to: client.path.signIn,
        search: {
          redirect: location.href,
        },
        replace: true,
      });
    },
  });
}
