import { getRedisClient } from '@/db/redis';
import type { InsertVendor } from '@/db/schemas/vendors';
import { checkOtpRestrictions, sendOtp, setRefreshTokenCookie, trackOtpRequests } from '@/lib/auth';
import { generateAccessToken, generateRefreshToken } from '@/lib/token';
import type { VendorSignInInput, VendorSignUpInput, VerifyVendorInput } from '@/models/vendor.model';
import { VendorRepository } from '@/repositories/vendor.repository';
import { logger } from '@/utils/logger';
import { hashPassword, verifyPassword } from '@/utils/password';
import { ServiceResponse } from '@repo/server/lib/service-response';
import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class VendorService {
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
      user: { id: string };
    } | null>
  > {
    try {
      const user = await this.vendorRepository.getVendorByEmail(data.email);

      if (!user || !user.id || !user.password) {
        return ServiceResponse.failure('Invalid credentials', null, StatusCodes.UNAUTHORIZED);
      }

      const isPasswordValid = await verifyPassword(user.password, data.password);

      if (!isPasswordValid) {
        return ServiceResponse.failure('Invalid credentials', null, StatusCodes.UNAUTHORIZED);
      }

      const { token: refreshToken, sessionId } = await generateRefreshToken(user.id, 'vendor');

      const accessToken = generateAccessToken({
        sub: user.id,
        email: user.email,
        userId: user.id,
        sessionId,
        role: 'vendor',
      });

      setRefreshTokenCookie(res, refreshToken, 'vendor');

      return ServiceResponse.success(
        'Signed in successfully',
        {
          accessToken,
          user: {
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
      const vendor = await this.vendorRepository.createVendor({
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
}

export const vendorService = new VendorService();
