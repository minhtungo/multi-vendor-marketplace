import { env } from '@/configs/env';
import { tokenConfig } from '@/configs/token';
import * as redisService from '@/services/redis.service';
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
    Date.now() + tokenConfig.refreshToken.maxAgeInSeconds
  );

  const token = sign(
    {
      sub: userId,
      sessionId,
    },
    tokenConfig.refreshToken.secret,
    {
      expiresIn: tokenConfig.refreshToken.maxAgeInSeconds,
    }
  );

  // Store the refresh token in Redis
  await redisService.storeRefreshToken(userId, sessionId, token);

  return {
    token,
    expiresAt,
    sessionId,
  };
};

export const validateRefreshToken = async (
  sessionId: string,
  token: string
): Promise<boolean> => {
  return await redisService.validateRefreshToken(sessionId, token);
};

export const invalidateRefreshToken = async (
  userId: string,
  sessionId: string
): Promise<void> => {
  await redisService.invalidateRefreshToken(userId, sessionId);
};
