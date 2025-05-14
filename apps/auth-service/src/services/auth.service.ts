import { tokenConfig } from '@/configs/token';
import { getRedisClient } from '@/db/redis';
import type { User } from '@/db/schemas/users';
import { checkOtpRestrictions, sendOtp, setRefreshTokenCookie, trackOtpRequests } from '@/lib/auth';
import { emailService } from '@/lib/emails';
import { generateAccessToken, generateRefreshToken, invalidateRefreshToken, validateRefreshToken } from '@/lib/token';
import type { SignInInput, SignUpInput, VerifyUserInput } from '@/models/auth.model';
import { tokenRepository } from '@/repositories/token.repository';
import { userRepository, UserRepository } from '@/repositories/user.repository';
import type { RefreshTokenPayload } from '@/types/token';
import { logger } from '@/utils/logger';
import { hashPassword, verifyPassword } from '@/utils/password';
import { createTransaction } from '@/utils/transaction';
import { ServiceResponse } from '@repo/server/lib/service-response';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

export class AuthService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async signUp(data: SignUpInput, next: NextFunction): Promise<ServiceResponse> {
    try {
      const existingUser = await this.userRepository.getUserByEmail(data.email);

      if (existingUser) {
        return ServiceResponse.success(
          'If your email is not registered, you will receive an email with a otp shortly',
          null,
          StatusCodes.OK
        );
      }

      await checkOtpRestrictions(data.email, next);
      await trackOtpRequests(data.email, next);

      await sendOtp(data.email);

      return ServiceResponse.success(
        'If your email is not registered, you will receive an email with a otp shortly',
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error signing up: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('An error occurred while signing up.', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async signIn(
    data: SignInInput,
    res: Response
  ): Promise<
    ServiceResponse<{
      accessToken: string;
      convertedUser: { id: string };
    } | null>
  > {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);

      if (!user || !user.id || !user.password) {
        return ServiceResponse.failure('Invalid credentials', null, StatusCodes.UNAUTHORIZED);
      }

      const isPasswordValid = await verifyPassword(user.password, data.password);

      if (!isPasswordValid) {
        return ServiceResponse.failure('Invalid credentials', null, StatusCodes.UNAUTHORIZED);
      }

      const { token: refreshToken, sessionId } = await generateRefreshToken(user.id);

      const accessToken = generateAccessToken({
        sub: user.id,
        email: user.email,
        userId: user.id,
        sessionId,
      });

      setRefreshTokenCookie(res, refreshToken);

      return ServiceResponse.success(
        'Signed in successfully',
        {
          accessToken,
          convertedUser: {
            id: user.id,
          },
        },
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error signing in: ${(ex as Error).message}`;
      logger.error(errorMessage);

      return ServiceResponse.failure('An error occurred while signing in.', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async forgotPassword(email: string, next: NextFunction): Promise<ServiceResponse> {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      if (!user || !user.id) {
        return ServiceResponse.success(
          'If a matching account is found, a password reset email will be sent to you shortly',
          null,
          StatusCodes.OK
        );
      }

      const resetPasswordToken = await tokenRepository.createResetPasswordToken(user.id);

      await emailService.sendPasswordResetEmail(user.email, user.name, resetPasswordToken);

      return ServiceResponse.success(
        'If a matching account is found, a password reset email will be sent to you shortly',
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error forgetting password: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while forgetting password',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async resetPassword(token: string, password: string): Promise<ServiceResponse> {
    try {
      const existingToken = await tokenRepository.getResetPasswordTokenByToken(token);

      if (!existingToken || existingToken.expires < new Date()) {
        return ServiceResponse.failure('Invalid token', null, StatusCodes.BAD_REQUEST);
      }

      await createTransaction(async (trx) => {
        await this.userRepository.updateUserPassword(existingToken.userId, password, trx);
        await tokenRepository.deleteResetPasswordTokenByToken(token, trx);
      });

      return ServiceResponse.success('Password reset successfully', null, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error resetting password: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while resetting password',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async refreshToken(
    refreshToken: string,
    res: Response
  ): Promise<
    ServiceResponse<{
      accessToken: string;
      userId: string;
    } | null>
  > {
    if (!refreshToken) {
      return ServiceResponse.failure('Refresh token not found', null, StatusCodes.UNAUTHORIZED);
    }

    try {
      // First verify the token and check if it's expired
      const payload = verify(refreshToken, tokenConfig.refreshToken.secret) as RefreshTokenPayload;

      // Check if token is blacklisted
      const isValid = await validateRefreshToken(payload.sessionId, refreshToken);
      if (!isValid) {
        return ServiceResponse.failure('Token has been revoked', null, StatusCodes.UNAUTHORIZED);
      }

      // Get user and verify they exist
      const user = await this.userRepository.getUserById(payload.sub);
      if (!user) {
        return ServiceResponse.failure('User not found', null, StatusCodes.UNAUTHORIZED);
      }

      // Invalidate the current refresh token first
      await invalidateRefreshToken(user.id, payload.sessionId);

      // Generate new tokens
      const { token: newRefreshToken, sessionId } = await generateRefreshToken(user.id);
      const accessToken = generateAccessToken({
        sub: user.id,
        email: user.email,
        userId: user.id,
        sessionId,
      });

      // Set the new refresh token cookie
      setRefreshTokenCookie(res, newRefreshToken);

      return ServiceResponse.success('Token refreshed', { accessToken, userId: user.id }, StatusCodes.OK);
    } catch (ex) {
      // Clear the refresh token cookie on any error
      res.clearCookie(tokenConfig.refreshToken.cookieName);

      if (ex instanceof Error) {
        if (ex.name === 'TokenExpiredError') {
          return ServiceResponse.failure('Refresh token has expired', null, StatusCodes.UNAUTHORIZED);
        }
        if (ex.name === 'JsonWebTokenError') {
          return ServiceResponse.failure('Invalid refresh token', null, StatusCodes.UNAUTHORIZED);
        }
      }

      const errorMessage = `Error refreshing token: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while refreshing token',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async verifyUser({ email, password, otp }: VerifyUserInput): Promise<ServiceResponse> {
    try {
      const redis = getRedisClient();
      const storedOtp = await redis.get(`otp:${email}`);

      if (!storedOtp) {
        return ServiceResponse.failure('Invalid OTP', null, StatusCodes.BAD_REQUEST);
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
            StatusCodes.TOO_MANY_REQUESTS
          );
        }

        await redis.set(failedAttemptsKey, failedAttempts + 1, 'EX', 300);
        return ServiceResponse.failure('Invalid OTP', null, StatusCodes.BAD_REQUEST);
      }

      await redis.del(`otp:${email}`, failedAttemptsKey);

      const hashedPassword = password ? await hashPassword(password) : undefined;

      await userRepository.createUser({
        email,
        password: hashedPassword,
        name: 'New user',
      });

      return ServiceResponse.success('User created successfully', null, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error verifying email: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while verifying email',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signOut(refreshToken: string): Promise<ServiceResponse> {
    try {
      const payload = verify(refreshToken, tokenConfig.refreshToken.secret) as RefreshTokenPayload;
      await invalidateRefreshToken(payload.sub, payload.sessionId);
      return ServiceResponse.success('Signed out successfully', null, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error signing out: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('An error occurred while signing out.', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getMe(req: Request): Promise<ServiceResponse<User | null>> {
    try {
      const user = req.user as User;
      return ServiceResponse.success('User fetched successfully', user, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error fetching user: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('An error occurred while fetching user.', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

// Export a singleton instance for convenience
export const authService = new AuthService();
