import { api } from '@/lib/api-client';
import { Product } from '@repo/types/product';

export async function getProduct(handle: string) {
  const response = await api.get<Product>('/products/list', {
    params: {
      handle,
    },
  });

  return response.data;
}
