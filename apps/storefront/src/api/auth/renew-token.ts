import { env } from '@/configs/env';
import { server } from '@/configs/server';

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export async function renewToken(): Promise<void> {
  if (isRefreshing) {
    return refreshPromise!;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${env.SERVER_URL}${server.path.auth.renewToken}`, {
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
        // TODO: Implement access token
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
