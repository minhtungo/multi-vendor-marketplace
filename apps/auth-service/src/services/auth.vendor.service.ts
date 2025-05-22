import { env } from '@/configs/env';
import { checkOtpRestrictions, sendOtp, setRefreshTokenCookie, trackOtpRequests } from '@/lib/auth';
import { generateAccessToken, generateRefreshToken, invalidateRefreshToken, validateRefreshToken } from '@/lib/token';
import type { VendorSignInInput, VendorSignUpInput, VerifyVendorInput } from '@/models/auth.vendor.model';
import { RefreshTokenPayload } from '@/types/token';
import { logger } from '@/utils/logger';
import { getRedisClient } from '@repo/redis';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';
import type { NextFunction, Request, Response } from 'express';

import { vendorServiceClient } from '@/lib/vendor-service.client';
import { vendorAuthProducer } from '@repo/messaging';
import { verify } from 'jsonwebtoken';

export class AuthVendorService {
  async signUp(data: VendorSignUpInput, next: NextFunction): Promise<ServiceResponse> {
    try {
      const existingVendor = await vendorServiceClient.getVendorByEmail(data.email);

      if (existingVendor) {
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
        'If your email is not registered, you will receive an email with an OTP shortly',
        null,
        HTTP_STATUS_CODES.OK
      );
    } catch (ex) {
      const errorMessage = `Error signing up vendor: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while signing up vendor.',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signIn(
    data: VendorSignInInput,
    res: Response
  ): Promise<
    ServiceResponse<{
      accessToken: string;
      vendor: { id: string };
    } | null>
  > {
    try {
      const vendor = await vendorServiceClient.getVendorByEmail(data.email);

      if (!vendor || !vendor.id) {
        return ServiceResponse.failure('Invalid credentials', null, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      const isPasswordValid = await vendorServiceClient.verifyPassword(vendor.email, data.password);

      if (!isPasswordValid) {
        return ServiceResponse.failure('Invalid credentials', null, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      const { token: refreshToken, sessionId } = await generateRefreshToken(vendor.id, 'vendor');

      const accessToken = generateAccessToken({
        sub: vendor.id,
        email: vendor.email,
        userId: vendor.id,
        sessionId,
        role: 'vendor',
      });

      setRefreshTokenCookie(res, refreshToken, 'vendor');

      return ServiceResponse.success(
        'Signed in successfully',
        {
          accessToken,
          vendor: {
            id: vendor.id,
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

  async verifyVendor({ email, otp, password, name }: VerifyVendorInput): Promise<ServiceResponse> {
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

      await vendorAuthProducer.initialize();
      await vendorAuthProducer.publishVendorRegistered({
        email,
        password,
        timestamp: Date.now(),
      });

      return ServiceResponse.success('Vendor account created successfully', null, HTTP_STATUS_CODES.CREATED);
    } catch (ex) {
      const errorMessage = `Error verifying vendor: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while verifying vendor',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async renewToken(
    req: Request,
    res: Response
  ): Promise<ServiceResponse<{ accessToken: string; vendorId: string } | null>> {
    const refreshToken = req.cookies[env.VENDOR_REFRESH_TOKEN_COOKIE_NAME];
    if (!refreshToken) {
      return ServiceResponse.failure('No refresh token provided', null, HTTP_STATUS_CODES.UNAUTHORIZED);
    }

    try {
      const payload = verify(refreshToken, env.ACCESS_TOKEN_SECRET) as RefreshTokenPayload;

      const isValid = await validateRefreshToken(payload.sessionId, refreshToken);

      if (!isValid) {
        return ServiceResponse.failure('Token has been revoked', null, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      const vendor = await vendorServiceClient.getVendorById(payload.sub);

      if (!vendor) {
        return ServiceResponse.failure('Vendor not found', null, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      await invalidateRefreshToken(vendor.id, payload.sessionId);

      const { token: newRefreshToken, sessionId } = await generateRefreshToken(vendor.id, 'vendor');
      const accessToken = generateAccessToken({
        sub: vendor.id,
        email: vendor.email,
        userId: vendor.id,
        sessionId,
        role: 'vendor',
      });

      setRefreshTokenCookie(res, newRefreshToken, 'vendor');

      return ServiceResponse.success('Token refreshed', { accessToken, vendorId: vendor.id }, HTTP_STATUS_CODES.OK);
    } catch (ex) {
      const errorMessage = `Error renewing token: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while renewing token',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getVendor(req: Request): Promise<ServiceResponse<Express.User | null>> {
    const vendor = await vendorServiceClient.getVendorById(req.params.id);
    return ServiceResponse.success('Vendor retrieved successfully', vendor, HTTP_STATUS_CODES.OK);
  }
}

export const authVendorService = new AuthVendorService();
