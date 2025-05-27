import { api } from '@/lib/api-client';
import { Product } from '@repo/types/product';

export async function getProduct(id: string) {
  const response = await api.get<Product>(`/products/${id}`);

  return response.data;
}
