import { publicApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const createStripeConnectLinkSchema = z.object({});

export type CreateStripeConnectLinkInput = z.infer<typeof createStripeConnectLinkSchema>;

export async function createStripeConnectLink(data: CreateStripeConnectLinkInput): Promise<
  ApiResponse<{
    url: string;
  }>
> {
  const createStripeConnectLinkData = createStripeConnectLinkSchema.parse(data);
  return publicApi.post(server.path.stripe.createConnectLink, createStripeConnectLinkData);
}

export function useCreateStripeConnectLinkMutation() {
  return useMutation({
    mutationFn: createStripeConnectLink,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
