import { commonValidations } from '@/utils/commonValidation';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const SignUpSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type SignInInput = z.infer<typeof SignInSchema>;

export const ForgotPasswordSchema = z.object({
  email: commonValidations.email,
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: commonValidations.password,
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export const VerifyUserSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type VerifyUserInput = z.infer<typeof VerifyUserSchema>;
