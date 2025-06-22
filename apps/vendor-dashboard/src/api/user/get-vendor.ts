import { privateApi } from '@/api/api-client';
import { api } from '@/configs/server';
import type { Vendor } from '@repo/types/vendor';
import { queryOptions, useQuery } from '@tanstack/react-query';

export async function getVendor(): Promise<Vendor> {
  const response = await privateApi.get(api.auth.me);
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
