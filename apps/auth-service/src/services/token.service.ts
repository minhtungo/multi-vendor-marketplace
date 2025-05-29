import { tokenConfig } from '@/configs/token';
import { tokenRepository } from '@/repositories/token.repository';
import { logger } from '@/utils/logger';
import { getRedisClient } from '@repo/redis';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';

class TokenService {
  private redis: ReturnType<typeof getRedisClient>;

  constructor() {
    this.redis = getRedisClient();
  }

  async verifyResetPasswordToken(token: string) {
    const existingToken = await tokenRepository.getResetPasswordTokenByToken(token);

    if (!existingToken || existingToken.expires < new Date()) {
      return ServiceResponse.failure('Invalid or expired token', null, HTTP_STATUS_CODES.BAD_REQUEST);
    }

    return ServiceResponse.success('Token is valid', null, HTTP_STATUS_CODES.OK);
  }

  async storeRefreshToken(userId: string, sessionId: string, token: string): Promise<void> {
    try {
      const userSessionKey = `user:${userId}:sessions`;
      const sessionKey = `session:${sessionId}`;

      await this.redis.set(sessionKey, token, 'EX', tokenConfig.refreshToken.maxAgeInSeconds);
      await this.redis.sadd(userSessionKey, sessionId);
      await this.redis.expire(userSessionKey, tokenConfig.refreshToken.maxAgeInSeconds);
    } catch (error) {
      logger.error(`Error storing refresh token: ${(error as Error).message}`);
      throw error;
    }
  }

  async validateRefreshToken(sessionId: string, token: string): Promise<boolean> {
    try {
      const sessionKey = `session:${sessionId}`;
      const storedToken = await this.redis.get(sessionKey);
      return storedToken === token;
    } catch (error) {
      logger.error(`Error validating refresh token: ${(error as Error).message}`);
      return false;
    }
  }

  async invalidateRefreshToken(userId: string, sessionId: string): Promise<void> {
    try {
      const sessionKey = `session:${sessionId}`;
      const userSessionKey = `user:${userId}:sessions`;

      await this.redis.del(sessionKey);
      await this.redis.srem(userSessionKey, sessionId);
    } catch (error) {
      logger.error(`Error invalidating refresh token: ${(error as Error).message}`);
      throw error;
    }
  }

  async invalidateAllUserSessions(userId: string): Promise<void> {
    try {
      const userSessionKey = `user:${userId}:sessions`;
      const sessionIds = await this.redis.smembers(userSessionKey);

      if (sessionIds.length > 0) {
        const sessionKeys = sessionIds.map((id) => `session:${id}`);
        await this.redis.del(...sessionKeys);
        await this.redis.del(userSessionKey);
      }
    } catch (error) {
      logger.error(`Error invalidating all user sessions: ${(error as Error).message}`);
      throw error;
    }
  }
}

export const tokenService = new TokenService();
