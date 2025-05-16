import { env } from '@/configs/env';
import { getRedisClient } from '@/db/redis';
import type { InsertVendor, Vendor } from '@/db/schemas/vendors';
import { checkOtpRestrictions, sendOtp, setRefreshTokenCookie, trackOtpRequests } from '@/lib/auth';
import { generateAccessToken, generateRefreshToken, invalidateRefreshToken, validateRefreshToken } from '@/lib/token';
import type { VendorSignInInput, VendorSignUpInput, VerifyVendorInput } from '@/models/auth.vendor.model';
import { VendorRepository } from '@/repositories/vendor.repository';
import { RefreshTokenPayload } from '@/types/token';
import { logger } from '@/utils/logger';
import { hashPassword, verifyPassword } from '@/utils/password';
import { ServiceResponse } from '@repo/server/lib/service-response';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

export class AuthVendorService {
  private vendorRepository: VendorRepository;

  constructor(repository: VendorRepository = new VendorRepository()) {
    this.vendorRepository = repository;
  }

  async signUp(data: VendorSignUpInput, next: NextFunction): Promise<ServiceResponse> {
    try {
      const existingVendor = await this.vendorRepository.getVendorByEmail(data.email);

      if (existingVendor) {
        return ServiceResponse.success(
          'If your email is not registered, you will receive an email with an OTP shortly',
          null,
          StatusCodes.OK
        );
      }

      await checkOtpRestrictions(data.email, next);
      await trackOtpRequests(data.email, next);

      await sendOtp(data.email);

      return ServiceResponse.success(
        'If your email is not registered, you will receive an email with an OTP shortly',
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error signing up vendor: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while signing up vendor.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signIn(
    data: VendorSignInInput,
    res: Response
  ): Promise<
    ServiceResponse<{
      accessToken: string;
      vendor: Omit<Vendor, 'password'>;
    } | null>
  > {
    try {
      const vendor = await this.vendorRepository.getVendorByEmail(data.email);

      if (!vendor || !vendor.id || !vendor.password) {
        return ServiceResponse.failure('Invalid credentials', null, StatusCodes.UNAUTHORIZED);
      }

      const isPasswordValid = await verifyPassword(vendor.password, data.password);

      if (!isPasswordValid) {
        return ServiceResponse.failure('Invalid credentials', null, StatusCodes.UNAUTHORIZED);
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
      const { password, ...rest } = vendor;
      return ServiceResponse.success(
        'Signed in successfully',
        {
          accessToken,
          vendor: {
            ...rest,
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

  async verifyVendor({ email, otp, password, name }: VerifyVendorInput): Promise<ServiceResponse<InsertVendor | null>> {
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
      // Create user first
      await this.vendorRepository.createVendor({
        email,
        name,
        password: hashedPassword,
      });

      return ServiceResponse.success('Vendor account created successfully', null, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error verifying vendor: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while verifying vendor',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async renewToken(req: Request, res: Response): Promise<ServiceResponse<{ accessToken: string } | null>> {
    const refreshToken = req.cookies[env.VENDOR_REFRESH_TOKEN_COOKIE_NAME];
    if (!refreshToken) {
      return ServiceResponse.failure('No refresh token provided', null, StatusCodes.UNAUTHORIZED);
    }

    try {
      const payload = verify(refreshToken, env.ACCESS_TOKEN_SECRET) as RefreshTokenPayload;

      const isValid = await validateRefreshToken(payload.sessionId, refreshToken);

      if (!isValid) {
        return ServiceResponse.failure('Token has been revoked', null, StatusCodes.UNAUTHORIZED);
      }

      const vendor = await this.vendorRepository.getVendorById(payload.sub);

      if (!vendor) {
        return ServiceResponse.failure('Vendor not found', null, StatusCodes.UNAUTHORIZED);
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

      return ServiceResponse.success('Token refreshed', { accessToken, vendor: { id: vendor.id } }, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error renewing token: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('An error occurred while renewing token', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getVendor(req: Request): Promise<ServiceResponse<Vendor | null>> {
    try {
      const vendor = req.user as Vendor;
      return ServiceResponse.success('Vendor fetched successfully', vendor, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error fetching vendor: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while fetching vendor.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const authVendorService = new AuthVendorService();
