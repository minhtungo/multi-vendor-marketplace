import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { ProductCategory } from '@/types/product-category';
import { useQuery } from '@tanstack/react-query';

export async function getProductCategories(): Promise<ApiResponse<ProductCategory[]>> {
  return privateApi.get(server.path.productCategory.root);
}

export function useGetProductCategoriesQuery() {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: getProductCategories,
  });
}
