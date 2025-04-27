import { env } from '@/configs/env';

export const tokenConfig = {
  accessToken: {
    length: 32,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    secret: env.ACCESS_TOKEN_SECRET,
  },
  refreshToken: {
    length: 32,
    maxAge: 1000 * 60 * 60 * 24 * 15, // 30 days
    cookieName: 'refreshToken',
    secret: env.REFRESH_TOKEN_SECRET,
  },
  verificationToken: {
    length: 32,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
  resetPasswordToken: {
    length: 32,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};
