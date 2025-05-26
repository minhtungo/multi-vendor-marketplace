import { env } from '@/configs/env';
import { ApiResponse } from '@/types/api';
import { renewToken } from '../api/auth/renew-token';
import { ApiError } from '@/lib/core/http/error';
import { buildUrlWithParams } from '@/utils/url';
import { getServerCookies } from '@/utils/cookies';

export type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  skipAuth?: boolean;
};

async function fetchApi<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, cookie, params, cache = 'no-store', next, skipAuth = false } = options;

  // Get cookies from the request when running on server
  let cookieHeader = cookie;

  if (typeof window === 'undefined' && !cookie) {
    cookieHeader = await getServerCookies();
  }

  const fullUrl = buildUrlWithParams(`${env.SERVER_URL}/v1${url}`, params);

  try {
    // TODO: Implement access token
    const accessToken = '';
    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      cache,
      next,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const message = errorData.message || response.statusText;

      // Check if it's an authentication error (401) and not already trying to refresh
      if (response.status === 401 && !skipAuth) {
        try {
          // Try to refresh the token
          await renewToken();

          // Retry the original request
          return fetchApi<T>(url, { ...options, skipAuth: true });
        } catch (refreshError) {
          // If refresh fails, throw the original error
          throw new ApiError(response.status, message, true);
        }
      }

      throw new ApiError(response.status, message, response.status === 401);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, error instanceof Error ? error.message : 'Unknown error occurred');
  }
}

export const api = {
  get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchApi<ApiResponse<T>>(endpoint, { ...options, method: 'GET' });
  },
  post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchApi<ApiResponse<T>>(endpoint, { ...options, method: 'POST', body });
  },
  put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchApi<ApiResponse<T>>(endpoint, { ...options, method: 'PUT', body });
  },
  patch<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchApi<ApiResponse<T>>(endpoint, { ...options, method: 'PATCH', body });
  },
  delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchApi<ApiResponse<T>>(endpoint, { ...options, method: 'DELETE' });
  },
};
