import { publicApi } from '@/api/api-client'
import { server } from '@/configs/server'
import type { ApiResponse } from '@/types/api'

export async function renewToken(): Promise<
  ApiResponse<{
    accessToken: string
  }>
> {
  return publicApi.put(server.path.auth.renewToken, null, {
    withCredentials: true,
  })
}
