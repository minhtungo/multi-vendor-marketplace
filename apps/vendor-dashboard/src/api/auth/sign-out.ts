import { privateApi } from '@/api/api-client';
import { getVendorQueryOptions } from '@/api/user/get-vendor';
import { client } from '@/configs/client';
import { server } from '@/configs/server';
import { useAuthActions } from '@/store/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useRouter } from '@tanstack/react-router';

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
      queryClient.setQueryData(getVendorQueryOptions().queryKey, undefined);
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
