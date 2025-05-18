import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ProductCategory } from '@/types/product-category';
import { useQuery } from '@tanstack/react-query';

export async function getProductCategories(): Promise<ProductCategory[]> {
  const response = await privateApi.get(server.path.productCategory.root);
  return response.data;
}

export function useGetProductCategoriesQuery() {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: getProductCategories,
  });
}
