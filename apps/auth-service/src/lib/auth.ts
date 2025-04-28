import { emailService } from '@/lib/emails';
import { getRedisClient } from '@/lib/redis';
import { generateOtp } from '@/utils/otp';
import { ValidationError } from '@packages/utils/error-handler';

const OTP_EXPIRY = 60 * 5;
const OTP_TIME_LIMIT = 60;

export const sendOtp = async (name: string, email: string) => {
  const otp = generateOtp();
  await emailService.sendVerificationEmail({
    to: email,
    username: name,
    otp,
  });

  const redis = getRedisClient();
  await redis.set(`otp:${email}`, otp, 'EX', OTP_EXPIRY);
  await redis.set(`otp_cooldown:${email}`, 'true', 'EX', OTP_TIME_LIMIT);
};

export const checkOtpRestrictions = async (
  email: string,
  next: NewableFunction
) => {
  const redis = getRedisClient();

  if (await redis.get(`otp_lock:${email}`)) {
    return next(
      new ValidationError(
        'Account locked due to multiple OTP requests. Try again after 30 minutes.'
      )
    );
  }

  if (await redis.get(`otp_spam_lock:${email}`)) {
    return next(
      new ValidationError(
        'Too many OTP requests. Please wait 1 hour before requesting another OTP.'
      )
    );
  }

  next();
};
