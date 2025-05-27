import { env } from '@/configs/env';
import { cookiesConfig } from '@/configs/cookies';

export const getAuthToken = async () => {
  if (typeof window !== 'undefined') return '';

  return import('next/headers').then(async ({ cookies }) => {
    try {
      const cookieStore = await cookies();
      return cookieStore.get(env.ACCESS_TOKEN_COOKIE_NAME)?.value;
    } catch (error) {
      console.error('Failed to access cookies:', error);
      return '';
    }
  });
};

export const setAuthToken = async (token: string) => {
  if (typeof window !== 'undefined') return;

  return import('next/headers').then(async ({ cookies }) => {
    try {
      const cookieStore = await cookies();

      cookieStore.set(env.ACCESS_TOKEN_COOKIE_NAME, token, {
        ...cookiesConfig.accessToken,
      });
    } catch (error) {
      console.error('Failed to set cookies:', error);
    }
  });
};

export const removeAuthToken = async () => {
  if (typeof window !== 'undefined') return;

  return import('next/headers').then(async ({ cookies }) => {
    try {
      const cookieStore = await cookies();
      cookieStore.delete(env.ACCESS_TOKEN_COOKIE_NAME);
    } catch (error) {
      console.error('Failed to remove cookies:', error);
    }
  });
};
