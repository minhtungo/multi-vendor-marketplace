import { env } from '@/configs/env';

export const cookiesConfig = {
  accessToken: {
    name: env.ACCESS_TOKEN_COOKIE_NAME,
    expires: new Date(Date.now() + 60 * 30 * 1000),
    httpOnly: true,
    sameSite: 'lax' as 'lax' | 'strict' | 'none',
    secure: process.env.NODE_ENV === 'production',
  },
  cartId: {
    name: env.CART_ID_COOKIE_NAME,
    expires: new Date(Date.now() + 60 * 30 * 1000 * 24 * 30),
    httpOnly: true,
    sameSite: 'lax' as 'lax' | 'strict' | 'none',
    secure: process.env.NODE_ENV === 'production',
  },
};
