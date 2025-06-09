import { env } from '@/configs/env';
import { tokenConfig } from '@/configs/token';
import { tokenService } from '@/services/token.service';

import type { AccessTokenPayload } from '@/types/token';

import { sign } from 'jsonwebtoken';
import crypto from 'node:crypto';

export const generateToken = async (length = 32): Promise<string> => {
  const buffer = await crypto.randomBytes(Math.ceil(length * 0.75));

  return buffer.toString('base64url').slice(0, length);
};

export const generateAccessToken = (payload: AccessTokenPayload) => {
  return sign(payload, tokenConfig.accessToken.secret, {
    expiresIn: '30m',
    audience: env.VENDOR_ORIGIN,
  });
};

export const generateRefreshToken = async (
  userId: string,
  role: 'user' | 'vendor'
): Promise<{
  token: string;
  expiresAt: Date;
  sessionId: string;
}> => {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + tokenConfig.refreshToken.maxAgeInSeconds);

  const token = sign(
    {
      sub: userId,
      sessionId,
      role,
    },
    tokenConfig.refreshToken.secret,
    {
      expiresIn: tokenConfig.refreshToken.maxAgeInSeconds,
    }
  );

  await tokenService.storeRefreshToken(userId, sessionId, token);

  return {
    token,
    expiresAt,
    sessionId,
  };
};

export const validateRefreshToken = async (sessionId: string, token: string): Promise<boolean> => {
  return await tokenService.validateRefreshToken(sessionId, token);
};

export const invalidateRefreshToken = async (userId: string, sessionId: string): Promise<void> => {
  await tokenService.invalidateRefreshToken(userId, sessionId);
};
