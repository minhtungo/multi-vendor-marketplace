import { env } from '@/configs/env';
import { getAuthToken } from '@/lib/cookies';
import { ApiError } from '@/lib/core/http/error';
import { buildUrlWithParams } from '@/utils/url';
import { ApiResponse } from '@repo/types/api';

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

function getServerCookies() {
  if (typeof window !== 'undefined') return '';

  // Dynamic import next/headers only on server-side
  return import('next/headers').then(async ({ cookies }) => {
    try {
      const cookieStore = await cookies();
      return cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');
    } catch (error) {
      console.error('Failed to access cookies:', error);
      return '';
    }
  });
}

async function fetchApi<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, cookie, params, cache = 'no-store', next, skipAuth = false } = options;

  // Get cookies from the request when running on server
  let cookieHeader = cookie;

  if (typeof window === 'undefined' && !cookie) {
    cookieHeader = await getServerCookies();
  }

  const fullUrl = buildUrlWithParams(`${env.SERVER_URL}/v1${url}`, params);

  console.log('url', fullUrl);

  try {
    const accessToken = await getAuthToken();

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

    //TODO: Handle 401 error
    // if (!response.ok) {
    //   if (response.status === 401 && !skipAuth) {
    //     await renewToken();
    //     return fetchApi<T>(url, { ...options, skipAuth: true });
    //   }
    // }

    return await response.json();
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
