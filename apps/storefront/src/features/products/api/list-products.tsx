import { api } from '@/lib/api-client';
import { type Product } from '@repo/types/product';

type PaginatedProductsParams = {
  //   sortBy: SortOptions;
  limit: number;
};

type ListProductsProps = {
  queryParams: PaginatedProductsParams;
  pageParam?: number;
};

type PaginatedProductsResponse = {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function listProducts({ queryParams, pageParam }: ListProductsProps) {
  const response = await api.get<PaginatedProductsResponse>('/products', {
    params: { ...queryParams, page: pageParam },
  });

  return response.data;
}
