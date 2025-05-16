import { publicApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { Shop } from '@/types/shop';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const createShopSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  phoneNumber: z.string(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
});

export type CreateShopInput = z.infer<typeof createShopSchema>;

export async function createShop(data: CreateShopInput): Promise<
  ApiResponse<{
    shop: Shop;
  }>
> {
  const createShopData = createShopSchema.parse(data);
  return publicApi.post(server.path.shop.root, createShopData);
}

export function useCreateShopMutation() {
  return useMutation({
    mutationFn: createShop,
  });
}
