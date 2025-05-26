import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { Order } from '@/types/order';
import { useInfiniteQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const getOrdersSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(20),
});

export type GetOrdersInput = z.infer<typeof getOrdersSchema>;

export type GetOrdersResponse = {
  orders: Order[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function getOrders(params: GetOrdersInput): Promise<GetOrdersResponse> {
  const response = await privateApi.get(server.path.order.root, { params });
  return response.data;
}

export function getOrdersQueryOptions(params: GetOrdersInput) {
  return {
    queryKey: ['orders', params],
    queryFn: () => getOrders(params),
  };
}
export function useGetOrders(params: GetOrdersInput) {
  return useInfiniteQuery({
    ...getOrdersQueryOptions(params),
    getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
    initialPageParam: 1,
  });
}
