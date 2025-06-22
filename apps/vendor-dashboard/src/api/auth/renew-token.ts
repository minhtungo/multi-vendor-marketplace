import { publicApi } from '@/api/api-client';
import { api } from '@/configs/server';
import type { ApiResponse } from '@repo/types/api';

export async function renewToken(): Promise<
  ApiResponse<{
    accessToken: string;
  }>
> {
  return publicApi.put(api.auth.renewToken, null, {
    withCredentials: true,
  });
}
