import { env } from '@/configs/env';
import { server } from '@/configs/server';
import { tokenManager } from './token';

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export async function refreshToken(): Promise<void> {
  if (isRefreshing) {
    return refreshPromise!;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}${server.path.auth.renewToken}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      if (data.accessToken) {
        await tokenManager.setToken(data.accessToken);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export function isAuthError(error: unknown): boolean {
  return error instanceof Error && 'isAuthError' in error && (error as any).isAuthError === true;
}
