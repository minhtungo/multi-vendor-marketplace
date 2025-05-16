import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { Vendor } from '@/types/vendor';
import { queryOptions, useQuery } from '@tanstack/react-query';

export function getVendor(): Promise<ApiResponse<Vendor>> {
  return privateApi.get(server.path.auth.me);
}

export function getVendorQueryOptions() {
  return queryOptions({
    queryKey: ['vendor'],
    queryFn: async () => {
      const response = await getVendor();
      return response.data;
    },
  });
}

export function useVendor() {
  return useQuery({
    ...getVendorQueryOptions(),
  });
}
