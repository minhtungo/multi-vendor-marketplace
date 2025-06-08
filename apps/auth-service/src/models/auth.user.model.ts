import { commonValidations } from '@repo/shared-server/lib';
import { z } from 'zod/v4';

export const signUpSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type SignInInput = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: commonValidations.email,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: commonValidations.password,
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const verifyUserSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type VerifyUserInput = z.infer<typeof verifyUserSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: commonValidations.email,
  name: z.string(),
  role: z.enum(['admin', 'user']),
});

export type User = z.infer<typeof userSchema>;
