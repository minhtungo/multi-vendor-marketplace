import { tokenConfig } from "@/configs/token";
import { getRedisClient } from "@/db/redis";
import { logger } from "@/utils/logger";

export class RedisService {
	private redis = getRedisClient();

	async storeRefreshToken(userId: string, sessionId: string, token: string): Promise<void> {
		try {
			const userSessionKey = `user:${userId}:sessions`;
			const sessionKey = `session:${sessionId}`;

			await this.redis.set(sessionKey, token, "EX", tokenConfig.refreshToken.maxAgeInSeconds);
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

	async storeRateLimit(ip: string, hits: number, resetTime: Date): Promise<void> {
		try {
			const key = `ratelimit:${ip}`;
			const data = JSON.stringify({ hits, resetTime: resetTime.getTime() });
			const ttl = Math.ceil((resetTime.getTime() - Date.now()) / 1000);

			await this.redis.set(key, data, "EX", ttl > 0 ? ttl : 1);
		} catch (error) {
			logger.error(`Error storing rate limit data: ${(error as Error).message}`);
			// Don't throw to prevent disrupting the request flow
		}
	}

	async getRateLimit(ip: string): Promise<{ hits: number; resetTime: Date } | null> {
		try {
			const key = `ratelimit:${ip}`;
			const data = await this.redis.get(key);

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
	}
}

// Create a singleton instance for backward compatibility
export const redisService = new RedisService();
