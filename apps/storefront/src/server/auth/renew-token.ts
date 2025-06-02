import { env } from '@/config/env';
import { serverPaths } from '@/config/paths';
import { setAuthToken } from '@/lib/cookies';

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export async function renewToken(): Promise<void> {
  if (isRefreshing) {
    return refreshPromise!;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${env.SERVER_URL}/v1${serverPaths.auth.renewToken}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.accessToken) {
          await setAuthToken(data.accessToken);
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}
