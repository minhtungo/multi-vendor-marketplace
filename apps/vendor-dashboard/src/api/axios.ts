import { env } from '@/configs/env'
import type { InternalAxiosRequestConfig } from 'axios'

export const baseAxiosConfig = {
  baseURL: `${env.VITE_SERVER_URL}`,
  headers: {
    Accept: 'application/json',
  },
}

export type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  sent?: boolean
}
