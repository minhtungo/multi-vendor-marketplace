import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { Vendor } from '@/types/vendor';
import { queryOptions, useQuery } from '@tanstack/react-query';

export function getUser(): Promise<ApiResponse<Vendor>> {
  return privateApi.get(server.path.user.me);
}

export function getUserQueryOptions() {
  return queryOptions({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await getUser();
      return response.data;
    },
  });
}

export function useUser() {
  return useQuery({
    ...getUserQueryOptions(),
  });
}
