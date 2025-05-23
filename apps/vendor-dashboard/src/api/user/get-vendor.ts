import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { Vendor } from '@/types/vendor';
import { queryOptions, useQuery } from '@tanstack/react-query';

export async function getVendor(): Promise<Vendor> {
  const response = await privateApi.get(server.path.auth.me);
  return response.data;
}

export function getVendorQueryOptions() {
  return queryOptions({
    queryKey: ['vendor'],
    queryFn: getVendor,
  });
}

export function useVendor() {
  return useQuery({
    ...getVendorQueryOptions(),
  });
}
