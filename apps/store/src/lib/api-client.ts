import { env } from '@/configs/env';
import { refreshToken } from './auth';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  skipAuth?: boolean;
};

function buildUrlWithParams(url: string, params?: RequestOptions['params']): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString();
  return `${url}?${queryString}`;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public isAuthError: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Create a separate function for getting server-side cookies that can be imported where needed
export function getServerCookies() {
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

  const fullUrl = buildUrlWithParams(`${env.NEXT_PUBLIC_SERVER_URL}${url}`, params);

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
          await refreshToken();

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
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(endpoint, { ...options, method: 'GET' });
  },
  post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(endpoint, { ...options, method: 'POST', body });
  },
  put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(endpoint, { ...options, method: 'PUT', body });
  },
  patch<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(endpoint, { ...options, method: 'PATCH', body });
  },
  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
