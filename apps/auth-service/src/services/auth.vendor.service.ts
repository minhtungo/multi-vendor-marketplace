import { env } from '@/configs/env';
import { checkOtpRestrictions, sendOtp, setRefreshTokenCookie, trackOtpRequests } from '@/lib/auth';
import { generateAccessToken, generateRefreshToken, invalidateRefreshToken, validateRefreshToken } from '@/lib/token';
import type { VendorSignInInput, VendorSignUpInput, VerifyVendorInput } from '@/models/auth.vendor.model';
import { RefreshTokenPayload } from '@/types/token';
import { logger } from '@/utils/logger';
import { getRedisClient } from '@repo/redis';
import { HTTP_STATUS_CODES } from '@repo/shared-server/core';
import { ServiceResponse, executeWithErrorHandling } from '@repo/shared-server/lib';
import type { NextFunction, Request, Response } from 'express';

import { vendorServiceClient } from '@/services/clients/vendor.service.client';
import { verify } from 'jsonwebtoken';

export class AuthVendorService {
  async signUp(data: VendorSignUpInput, next: NextFunction): Promise<ServiceResponse> {
    return executeWithErrorHandling(
      'signUp',
      async () => {
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
      },
      logger
    );
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
    return executeWithErrorHandling(
      'signIn',
      async () => {
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
      },
      logger
    );
  }

  async verifyVendor({ email, otp, password, name }: VerifyVendorInput): Promise<ServiceResponse> {
    return executeWithErrorHandling(
      'verifyVendor',
      async () => {
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

        //TODO: publishVendorRegistered

        return ServiceResponse.success('Vendor account created successfully', null, HTTP_STATUS_CODES.CREATED);
      },
      logger
    );
  }

  async renewToken(
    req: Request,
    res: Response
  ): Promise<ServiceResponse<{ accessToken: string; vendorId: string } | null>> {
    const refreshToken = req.cookies[env.VENDOR_REFRESH_TOKEN_COOKIE_NAME];
    if (!refreshToken) {
      return ServiceResponse.failure('No refresh token provided', null, HTTP_STATUS_CODES.UNAUTHORIZED);
    }

    return executeWithErrorHandling(
      'renewToken',
      async () => {
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
      },
      logger
    );
  }

  async getVendor(vendorId: string): Promise<ServiceResponse<Express.User | null>> {
    return executeWithErrorHandling(
      'getVendor',
      async () => {
        const vendor = await vendorServiceClient.getVendorById(vendorId);
        return ServiceResponse.success('Vendor retrieved successfully', vendor, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }
}

export const authVendorService = new AuthVendorService();
