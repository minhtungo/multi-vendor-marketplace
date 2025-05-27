import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const getProductSchema = z.object({
  id: z.string().uuid(),
});

export type GetProductInput = z.infer<typeof getProductSchema>;

export async function getProduct({ id }: GetProductInput): Promise<Product> {
  const response = await privateApi.get(`${server.path.product.root}/${id}`);
  return response.data;
}

export function getProductQueryOptions(id: string) {
  return {
    queryKey: ['product', id],
    queryFn: () => getProduct({ id }),
    enabled: !!id,
  };
}

export function useGetProduct(id: string) {
  return useQuery({
    ...getProductQueryOptions(id),
  });
}
