import { privateApi, publicApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const connectPaymentSchema = z.object({});

export type ConnectPaymentInput = z.infer<typeof connectPaymentSchema>;

export async function connectPayment(data: ConnectPaymentInput): Promise<
  ApiResponse<{
    url: string;
  }>
> {
  const connectPaymentData = connectPaymentSchema.parse(data);
  return privateApi.post(server.path.payment.connect, connectPaymentData);
}

export function useConnectPaymentMutation() {
  return useMutation({
    mutationFn: connectPayment,
  });
}
