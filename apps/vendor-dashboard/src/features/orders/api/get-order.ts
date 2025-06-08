import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { Order } from '@repo/types/order';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod/v4';

export const getOrderSchema = z.object({
  id: z.string().uuid(),
});

export type GetOrderInput = z.infer<typeof getOrderSchema>;

export async function getOrder({ id }: GetOrderInput): Promise<Order> {
  const response = await privateApi.get(`${server.path.order.root}/${id}`);
  return response.data;
}

export function getOrderQueryOptions(id: string) {
  return {
    queryKey: ['order', id],
    queryFn: () => getOrder({ id }),
    enabled: !!id,
  };
}

export function useGetOrder(id: string) {
  return useQuery({
    ...getOrderQueryOptions(id),
  });
}
