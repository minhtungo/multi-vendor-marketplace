import 'server-only';
import { cookies as nextCookies } from 'next/headers';

import { env } from '@/config/env';
import { cookiesConfig } from '@/config/cookies';

export async function getAuthToken() {
  try {
    const cookieStore = await nextCookies();
    return cookieStore.get(env.ACCESS_TOKEN_COOKIE_NAME)?.value;
  } catch (error) {
    console.error('Failed to access cookies:', error);
    return '';
  }
}

export async function setAuthToken(token: string) {
  const cookieStore = await nextCookies();
  cookieStore.set(env.ACCESS_TOKEN_COOKIE_NAME, token, {
    ...cookiesConfig.accessToken,
  });
}

export async function removeAuthToken() {
  const cookieStore = await nextCookies();
  cookieStore.delete(env.ACCESS_TOKEN_COOKIE_NAME);
}

export async function getSessionId() {
  try {
    const cookieStore = await nextCookies();
    return cookieStore.get(env.SESSION_ID_COOKIE_NAME)?.value;
  } catch (error) {
    console.error('Failed to access cookies:', error);
    return '';
  }
}

export async function setSessionId(sessionId: string) {
  const cookieStore = await nextCookies();
  cookieStore.set(env.SESSION_ID_COOKIE_NAME, sessionId, {
    ...cookiesConfig.sessionId,
  });
}

export async function removeSessionId() {
  const cookieStore = await nextCookies();
  cookieStore.delete(env.SESSION_ID_COOKIE_NAME);
}

export function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `guest_${timestamp}_${randomPart}`;
}
