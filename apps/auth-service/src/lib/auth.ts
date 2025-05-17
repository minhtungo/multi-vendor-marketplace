import { env } from '@/configs/env';
import { tokenConfig } from '@/configs/token';
import { getRedisClient } from '@/db/redis';
import { emailService } from '@repo/email';
import { generateOtp } from '@/utils/otp';
import { ValidationError } from '@repo/server/lib/error-handlers';
import type { NextFunction, Response } from 'express';

const OTP_EXPIRY = 60 * 5;
const OTP_TIME_LIMIT = 60;

export const sendOtp = async (email: string) => {
  const otp = generateOtp();
  try {
    await emailService.sendVerificationEmail({
      to: email,
      username: email,
      otp,
    });
  } catch (error) {
    console.log('emailService', error);
  }

  const redis = getRedisClient();
  await redis.set(`otp:${email}`, otp, 'EX', OTP_EXPIRY);
  await redis.set(`otp_cooldown:${email}`, 'true', 'EX', OTP_TIME_LIMIT);
};

export const checkOtpRestrictions = async (email: string, next: NextFunction) => {
  const redis = getRedisClient();

  if (await redis.get(`otp_lock:${email}`)) {
    return next(new ValidationError('Account locked due to multiple OTP requests. Try again after 30 minutes.'));
  }

  if (await redis.get(`otp_spam_lock:${email}`)) {
    return next(new ValidationError('Too many OTP requests. Please wait 1 hour before requesting another OTP.'));
  }

  if (await redis.get(`otp_cooldown:${email}`)) {
    return next(new ValidationError('Please wait 1 minute before requesting another OTP.'));
  }
};

export const trackOtpRequests = async (email: string, next: NextFunction) => {
  const redis = getRedisClient();
  const otpRequestsKey = `otp_requests:${email}`;

  const otpRequests = Number.parseInt((await redis.get(otpRequestsKey)) || '0');

  if (otpRequests >= 2) {
    await redis.set(`otp_spam_lock:${email}`, 'locked', 'EX', 3600);
    return next(new ValidationError('Too many OTP requests. Please wait 1 hour before requesting another OTP.'));
  }

  await redis.set(otpRequestsKey, otpRequests + 1, 'EX', 60);
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string, role: 'user' | 'vendor' = 'user') => {
  res.cookie(role === 'user' ? env.REFRESH_TOKEN_COOKIE_NAME : env.VENDOR_REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: tokenConfig.refreshToken.maxAgeInSeconds,
  });
};
