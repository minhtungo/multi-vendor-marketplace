import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { Product } from '@repo/types/product';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod/v4';

export const getProductSchema = z.object({
  handle: z.string().trim(),
});

export type GetProductInput = z.infer<typeof getProductSchema>;

export async function getProduct({ handle }: GetProductInput): Promise<Product> {
  const response = await privateApi.get(`${server.path.product.root}/list`, {
    params: {
      handle,
    },
  });
  return response.data;
}

export function getProductQueryOptions(handle: string) {
  return {
    queryKey: ['product', handle],
    queryFn: () => getProduct({ handle }),
    enabled: !!handle,
  };
}

export function useGetProduct(handle: string) {
  return useQuery({
    ...getProductQueryOptions(handle),
  });
}
