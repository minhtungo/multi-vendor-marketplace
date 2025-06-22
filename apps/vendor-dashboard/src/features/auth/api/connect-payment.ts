import { privateApi } from '@/api/api-client';
import { api } from '@/configs/server';
import type { ApiResponse } from '@repo/types/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod/v4';

export const connectPaymentSchema = z.object({});

export type ConnectPaymentInput = z.infer<typeof connectPaymentSchema>;

export async function connectPayment(data: ConnectPaymentInput): Promise<
  ApiResponse<{
    url: string;
  }>
> {
  const connectPaymentData = connectPaymentSchema.parse(data);
  return privateApi.post(api.payment.connect, connectPaymentData);
}

export function useConnectPaymentMutation() {
  return useMutation({
    mutationFn: connectPayment,
  });
}
