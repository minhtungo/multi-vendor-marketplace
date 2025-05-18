import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { ProductCategory } from '@/types/product-category';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const getProductCategorySchema = z.object({
  id: z.string().uuid(),
});

export type GetProductCategoryInput = z.infer<typeof getProductCategorySchema>;

export async function getProductCategory({ id }: GetProductCategoryInput): Promise<ApiResponse<ProductCategory>> {
  return privateApi.get(`${server.path.productCategory.root}/${id}`);
}

export function useGetProductCategoryQuery(id: string) {
  return useQuery({
    queryKey: ['product-category', id],
    queryFn: () => getProductCategory({ id }),
    enabled: !!id,
  });
}
