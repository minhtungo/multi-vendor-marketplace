import { getRedisClient } from '@repo/redis';

export class RedisService {
  private redis = getRedisClient();
}

// Create a singleton instance for backward compatibility
export const redisService = new RedisService();
