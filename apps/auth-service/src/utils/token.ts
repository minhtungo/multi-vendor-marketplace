import { env } from '@/configs/env';
import { tokenConfig } from '@/configs/token';
import { AccessTokenPayload } from '@/types/token';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';

export const generateToken = async (length = 32): Promise<string> => {
  const buffer = await crypto.randomBytes(Math.ceil(length * 0.75));

  return buffer.toString('base64url').slice(0, length);
};

export const generateAccessToken = (payload: AccessTokenPayload) => {
  return sign(payload, tokenConfig.accessToken.secret, {
    expiresIn: '30m',
    audience: env.APP_ORIGIN,
  });
};

export const generateRefreshToken = async (
  userId: string
): Promise<{
  token: string;
  expiresAt: Date;
  sessionId: string;
}> => {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(
    Date.now() + appConfig.token.refreshToken.expiresIn
  );

  const token = sign(
    {
      sub: userId,
      sessionId,
    },
    appConfig.token.refreshToken.secret,
    {
      expiresIn: appConfig.token.refreshToken.expiresIn,
    }
  );

  return {
    token,
    expiresAt,
    sessionId,
  };
};
