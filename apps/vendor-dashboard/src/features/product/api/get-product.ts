import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const getProductSchema = z.object({
  id: z.string().uuid(),
});

export type GetProductInput = z.infer<typeof getProductSchema>;

export async function getProduct({ id }: GetProductInput): Promise<ApiResponse<Product>> {
  return privateApi.get(`${server.path.product.root}/${id}`);
}

export function useGetProductQuery(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct({ id }),
    enabled: !!id,
  });
}
