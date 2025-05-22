import { env } from '@/configs/env';
import { tokenConfig } from '@/configs/token';
import { checkOtpRestrictions, sendOtp, setRefreshTokenCookie, trackOtpRequests } from '@/lib/auth';
import { generateAccessToken, generateRefreshToken, invalidateRefreshToken, validateRefreshToken } from '@/lib/token';
import { userServiceClient } from '@/lib/user-service.client';
import type { SignInInput, SignUpInput, VerifyUserInput } from '@/models/auth.user.model';
import { tokenRepository } from '@/repositories/token.repository';
import type { RefreshTokenPayload } from '@/types/token';
import { logger } from '@/utils/logger';
import { createTransaction } from '@/utils/transaction';
import { emailService } from '@repo/email';
import { userAuthProducer } from '@repo/messaging';
import { getRedisClient } from '@repo/redis';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';
import type { NextFunction, Request, Response } from 'express';

import { verify } from 'jsonwebtoken';

export class AuthService {
  async signUp(data: SignUpInput, next: NextFunction): Promise<ServiceResponse> {
    try {
      const existingUser = await userServiceClient.getUserByEmail(data.email);

      if (existingUser) {
        return ServiceResponse.success(
          'If your email is not registered, you will receive an email with a otp shortly',
          null,
          HTTP_STATUS_CODES.OK
        );
      }

      await checkOtpRestrictions(data.email, next);
      await trackOtpRequests(data.email, next);

      await sendOtp(data.email);

      return ServiceResponse.success(
        'If your email is not registered, you will receive an email with a otp shortly',
        null,
        HTTP_STATUS_CODES.OK
      );
    } catch (ex) {
      const errorMessage = `Error signing up: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while signing up.',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signIn(
    data: SignInInput,
    res: Response
  ): Promise<
    ServiceResponse<{
      accessToken: string;
      user: { id: string };
    } | null>
  > {
    try {
      const user = await userServiceClient.getUserByEmail(data.email);

      console.log('user', user);

      if (!user || !user.id) {
        return ServiceResponse.failure('Invalid credentials', null, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      const isPasswordValid = await userServiceClient.verifyPassword(user.email, data.password);

      if (!isPasswordValid) {
        return ServiceResponse.failure('Invalid credentials', null, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      const { token: refreshToken, sessionId } = await generateRefreshToken(user.id, 'user');

      const accessToken = generateAccessToken({
        sub: user.id,
        email: user.email,
        userId: user.id,
        sessionId,
        role: 'user',
      });

      setRefreshTokenCookie(res, refreshToken, 'user');

      return ServiceResponse.success(
        'Signed in successfully',
        {
          accessToken,
          user: {
            id: user.id,
          },
        },
        HTTP_STATUS_CODES.OK
      );
    } catch (ex) {
      const errorMessage = `Error signing in: ${(ex as Error).message}`;
      logger.error(errorMessage);

      return ServiceResponse.failure(
        'An error occurred while signing in.',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async forgotPassword(email: string, next: NextFunction): Promise<ServiceResponse> {
    try {
      const user = await userServiceClient.getUserByEmail(email);

      if (!user || !user.id) {
        return ServiceResponse.success(
          'If a matching account is found, a password reset email will be sent to you shortly',
          null,
          HTTP_STATUS_CODES.OK
        );
      }

      const resetPasswordToken = await tokenRepository.createResetPasswordToken(user.id);

      await emailService.sendPasswordResetEmail(user.email, user.email, resetPasswordToken);

      return ServiceResponse.success(
        'If a matching account is found, a password reset email will be sent to you shortly',
        null,
        HTTP_STATUS_CODES.OK
      );
    } catch (ex) {
      const errorMessage = `Error forgetting password: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while forgetting password',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async resetPassword(token: string, password: string): Promise<ServiceResponse> {
    try {
      const existingToken = await tokenRepository.getResetPasswordTokenByToken(token);

      if (!existingToken || existingToken.expires < new Date()) {
        return ServiceResponse.failure('Invalid token', null, HTTP_STATUS_CODES.BAD_REQUEST);
      }

      if (!existingToken.userId) {
        return ServiceResponse.failure('Invalid token', null, HTTP_STATUS_CODES.BAD_REQUEST);
      }

      await createTransaction(async (trx) => {
        await userAuthProducer.initialize();
        await userAuthProducer.publishUserPasswordReset({
          userId: existingToken.userId!,
          password,
          timestamp: Date.now(),
        });
        await tokenRepository.deleteResetPasswordTokenByToken(token, trx);
      });

      return ServiceResponse.success('Password reset successfully', null, HTTP_STATUS_CODES.OK);
    } catch (ex) {
      const errorMessage = `Error resetting password: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while resetting password',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async refreshToken(
    req: Request,
    res: Response
  ): Promise<
    ServiceResponse<{
      accessToken: string;
      userId: string;
    } | null>
  > {
    const refreshToken = req.cookies[env.ACCESS_TOKEN_SECRET];
    if (!refreshToken) {
      return ServiceResponse.failure('Refresh token not found', null, HTTP_STATUS_CODES.UNAUTHORIZED);
    }

    try {
      const payload = verify(refreshToken, env.ACCESS_TOKEN_SECRET) as RefreshTokenPayload;

      const isValid = await validateRefreshToken(payload.sessionId, refreshToken);

      if (!isValid) {
        return ServiceResponse.failure('Token has been revoked', null, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      const user = await userServiceClient.getUserById(payload.sub);
      if (!user) {
        return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      await invalidateRefreshToken(user.id, payload.sessionId);

      const { token: newRefreshToken, sessionId } = await generateRefreshToken(user.id, 'user');
      const accessToken = generateAccessToken({
        sub: user.id,
        email: user.email,
        userId: user.id,
        sessionId,
        role: 'user',
      });

      setRefreshTokenCookie(res, newRefreshToken);

      return ServiceResponse.success('Token refreshed', { accessToken, userId: user.id }, HTTP_STATUS_CODES.OK);
    } catch (ex) {
      // Clear the refresh token cookie on any error
      res.clearCookie(tokenConfig.refreshToken.cookieName);

      if (ex instanceof Error) {
        if (ex.name === 'TokenExpiredError') {
          return ServiceResponse.failure('Refresh token has expired', null, HTTP_STATUS_CODES.UNAUTHORIZED);
        }
        if (ex.name === 'JsonWebTokenError') {
          return ServiceResponse.failure('Invalid refresh token', null, HTTP_STATUS_CODES.UNAUTHORIZED);
        }
      }

      const errorMessage = `Error refreshing token: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while refreshing token',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async verifyUser({ email, password, otp }: VerifyUserInput): Promise<ServiceResponse> {
    try {
      const redis = getRedisClient();
      const storedOtp = await redis.get(`otp:${email}`);

      if (!storedOtp) {
        return ServiceResponse.failure('Invalid OTP', null, HTTP_STATUS_CODES.BAD_REQUEST);
      }

      const failedAttemptsKey = `otp_attempts:${email}`;
      const failedAttempts = parseInt((await redis.get(failedAttemptsKey)) || '0');

      if (storedOtp !== otp) {
        if (failedAttempts >= 2) {
          await redis.set(`otp_lock:${email}`, 'locked', 'EX', 1800);
          await redis.del(`otp:${email}`, failedAttemptsKey);
          return ServiceResponse.failure(
            'Account locked due to multiple OTP requests. Try again after 30 minutes.',
            null,
            HTTP_STATUS_CODES.TOO_MANY_REQUESTS
          );
        }

        await redis.set(failedAttemptsKey, failedAttempts + 1, 'EX', 300);
        return ServiceResponse.failure('Invalid OTP', null, HTTP_STATUS_CODES.BAD_REQUEST);
      }

      await redis.del(`otp:${email}`, failedAttemptsKey);

      await userAuthProducer.initialize();
      await userAuthProducer.publishUserRegistered({
        email,
        password,
        timestamp: Date.now(),
      });

      return ServiceResponse.success('User created successfully', null, HTTP_STATUS_CODES.CREATED);
    } catch (ex) {
      const errorMessage = `Error verifying email: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while verifying email',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signOut(refreshToken: string): Promise<ServiceResponse> {
    try {
      const payload = verify(refreshToken, tokenConfig.refreshToken.secret) as RefreshTokenPayload;
      await invalidateRefreshToken(payload.sub, payload.sessionId);
      return ServiceResponse.success('Signed out successfully', null, HTTP_STATUS_CODES.OK);
    } catch (ex) {
      const errorMessage = `Error signing out: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while signing out.',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getMe(req: Request): Promise<ServiceResponse<Express.User | null>> {
    try {
      const user = await userServiceClient.getUserById(req.params.id);
      return ServiceResponse.success('User retrieved successfully', user, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error getting user: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while getting user',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
}

// Export a singleton instance for convenience
export const authService = new AuthService();
