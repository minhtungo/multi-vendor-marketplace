import 'server-only';
import { cookies as nextCookies } from 'next/headers';

import { env } from '@/configs/env';
import { cookiesConfig } from '@/configs/cookies';

export const getAuthToken = async () => {
  try {
    const cookieStore = await nextCookies();
    return cookieStore.get(env.ACCESS_TOKEN_COOKIE_NAME)?.value;
  } catch (error) {
    console.error('Failed to access cookies:', error);
    return '';
  }
};

export const setAuthToken = async (token: string) => {
  const cookieStore = await nextCookies();
  cookieStore.set(env.ACCESS_TOKEN_COOKIE_NAME, token, {
    ...cookiesConfig.accessToken,
  });
};

export const removeAuthToken = async () => {
  const cookieStore = await nextCookies();
  cookieStore.delete(env.ACCESS_TOKEN_COOKIE_NAME);
};

export const getCartId = async () => {
  try {
    const cookieStore = await nextCookies();
    return cookieStore.get(env.CART_ID_COOKIE_NAME)?.value;
  } catch (error) {
    console.error('Failed to access cookies:', error);
    return '';
  }
};

export const setCartId = async (cartId: string) => {
  const cookieStore = await nextCookies();
  cookieStore.set(env.CART_ID_COOKIE_NAME, cartId, {
    ...cookiesConfig.cartId,
  });
};

export const removeCartId = async () => {
  const cookieStore = await nextCookies();
  cookieStore.delete(env.CART_ID_COOKIE_NAME);
};
