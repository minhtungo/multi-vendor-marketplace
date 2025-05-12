import { getRedisClient } from '@/db/redis';
import type { InsertVendor } from '@/db/schemas/vendors';
import { checkOtpRestrictions, sendOtp, trackOtpRequests } from '@/lib/auth';
import type { VendorSignUpInput, VerifyVendorInput } from '@/models/vendor.model';
import { userRepository } from '@/repositories/user.repository';
import { VendorRepository } from '@/repositories/vendor.repository';
import { logger } from '@/utils/logger';
import { ServiceResponse } from '@repo/server/lib/service-response';
import type { NextFunction } from 'express';
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

  async verifyVendor({ email, otp }: VerifyVendorInput): Promise<ServiceResponse<InsertVendor | null>> {
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

      // Create user first
      const user = await userRepository.createUser({
        email,
        name: 'New Vendor',
        role: 'vendor',
      });

      // Create vendor account
      const vendor = await this.vendorRepository.createVendor({
        userId: user.id,
        email,
        name: 'New Vendor',
        status: 'pending',
      });

      return ServiceResponse.success('Vendor account created successfully', vendor, StatusCodes.CREATED);
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
