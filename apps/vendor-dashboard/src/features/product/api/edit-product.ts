import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { getProductQueryOptions } from '@/features/product/api/get-product';
import { getProductsQueryOptions } from '@/features/product/api/get-products';
import type { Product } from '@repo/types/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const editProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(255, 'Product name too long'),
  slug: z.string().min(1, 'Product slug is required').max(255, 'Product slug too long'),
  description: z.string().optional(),
  sku: z.string().min(1, 'SKU is required').max(100, 'SKU too long'),
  price: z.coerce.number().positive('Price must be positive'),
  compareAtPrice: z.coerce.number().positive('Compare at price must be positive').optional(),
  quantity: z.coerce.number().int().min(0, 'Quantity must be non-negative'),
  status: z.enum(['published', 'draft']).default('draft'),
  type: z.enum(['physical', 'digital']).default('physical'),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export type EditProductInput = z.infer<typeof editProductSchema>;

export async function editProduct(id: string, data: EditProductInput): Promise<Product> {
  const parsedData = editProductSchema.parse(data);
  const response = await privateApi.put(`${server.path.product.root}/${id}`, parsedData);
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
