import { tokenConfig } from '@/configs/token';
import { getRedisClient } from '@/db/redis';
import { logger } from '@packages/utils/logger';

export const storeRefreshToken = async (
  userId: string,
  sessionId: string,
  token: string
): Promise<void> => {
  try {
    const redis = getRedisClient();
    const userSessionKey = `user:${userId}:sessions`;
    const sessionKey = `session:${sessionId}`;

    await redis.set(
      sessionKey,
      token,
      'EX',
      tokenConfig.refreshToken.maxAgeInSeconds
    );

    await redis.sadd(userSessionKey, sessionId);

    await redis.expire(
      userSessionKey,
      tokenConfig.refreshToken.maxAgeInSeconds
    );
  } catch (error) {
    logger.error(`Error storing refresh token: ${(error as Error).message}`);
    throw error;
  }
};

export const validateRefreshToken = async (
  sessionId: string,
  token: string
): Promise<boolean> => {
  try {
    const redis = getRedisClient();
    const sessionKey = `session:${sessionId}`;

    // Get stored token
    const storedToken = await redis.get(sessionKey);

    return storedToken === token;
  } catch (error) {
    logger.error(`Error validating refresh token: ${(error as Error).message}`);
    return false;
  }
};

export const invalidateRefreshToken = async (
  userId: string,
  sessionId: string
): Promise<void> => {
  try {
    const redis = getRedisClient();
    const sessionKey = `session:${sessionId}`;
    const userSessionKey = `user:${userId}:sessions`;

    // Delete session
    await redis.del(sessionKey);

    // Remove from user's sessions
    await redis.srem(userSessionKey, sessionId);
  } catch (error) {
    logger.error(
      `Error invalidating refresh token: ${(error as Error).message}`
    );
    throw error;
  }
};

/**
 * Invalidate all sessions for a user
 */
export const invalidateAllUserSessions = async (
  userId: string
): Promise<void> => {
  try {
    const redis = getRedisClient();
    const userSessionKey = `user:${userId}:sessions`;

    // Get all session IDs for user
    const sessionIds = await redis.smembers(userSessionKey);

    if (sessionIds.length > 0) {
      // Create an array of session keys
      const sessionKeys = sessionIds.map((id) => `session:${id}`);

      // Delete all sessions
      await redis.del(...sessionKeys);

      // Delete user's sessions set
      await redis.del(userSessionKey);
    }
  } catch (error) {
    logger.error(
      `Error invalidating all user sessions: ${(error as Error).message}`
    );
    throw error;
  }
};

/**
 * Store rate limit data
 */
export const storeRateLimit = async (
  ip: string,
  hits: number,
  resetTime: Date
): Promise<void> => {
  try {
    const redis = getRedisClient();
    const key = `ratelimit:${ip}`;
    const data = JSON.stringify({ hits, resetTime: resetTime.getTime() });

    // Calculate TTL in seconds
    const ttl = Math.ceil((resetTime.getTime() - Date.now()) / 1000);

    await redis.set(key, data, 'EX', ttl > 0 ? ttl : 1);
  } catch (error) {
    logger.error(`Error storing rate limit data: ${(error as Error).message}`);
    // Don't throw to prevent disrupting the request flow
  }
};

/**
 * Get rate limit data
 */
export const getRateLimit = async (
  ip: string
): Promise<{ hits: number; resetTime: Date } | null> => {
  try {
    const redis = getRedisClient();
    const key = `ratelimit:${ip}`;

    const data = await redis.get(key);

    if (data) {
      const parsed = JSON.parse(data);
      return {
        hits: parsed.hits,
        resetTime: new Date(parsed.resetTime),
      };
    }

    return null;
  } catch (error) {
    logger.error(`Error getting rate limit data: ${(error as Error).message}`);
    return null;
  }
};

// For backward compatibility
export const redisService = {
  storeRefreshToken,
  validateRefreshToken,
  invalidateRefreshToken,
  invalidateAllUserSessions,
  storeRateLimit,
  getRateLimit,
};
