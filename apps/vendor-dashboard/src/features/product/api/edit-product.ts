import { privateApi } from '@/api/api-client';
import { api } from '@/configs/server';
import { getProductQueryOptions } from '@/features/product/api/get-product';
import { getProductsQueryOptions } from '@/features/product/api/get-products';
import type { Product } from '@repo/types/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod/v4';

export const editProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(255, 'Product name too long'),
  slug: z.string().min(1, 'Product slug is required').max(255, 'Product slug too long'),
  description: z.string().optional(),
  sku: z.string().min(1, 'SKU is required').max(100, 'SKU too long'),
  price: z.string().min(1, 'Price is required'),
  compareAtPrice: z.string().optional(),
  stock: z.coerce.number().int().min(0, 'Stock must be non-negative'),
  status: z.enum(['published', 'draft']).default('draft'),
  type: z.enum(['physical', 'digital']).default('physical'),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export type EditProductInput = z.infer<typeof editProductSchema>;

export async function editProduct(id: string, data: EditProductInput): Promise<Product> {
  const parsedData = editProductSchema.parse(data);
  const response = await privateApi.put(api.products.single(id), parsedData);
  return response.data;
}

export function useEditProduct(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditProductInput }) => editProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductQueryOptions(id).queryKey });
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions({
          page: 1,
          limit: 20,
        }).queryKey,
      });
    },
  });
}
