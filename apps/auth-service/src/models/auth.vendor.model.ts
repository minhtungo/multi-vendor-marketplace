import { z } from 'zod';
import { commonValidations } from './common';

export const VendorSignUpSchema = z.object({
  email: commonValidations.email,
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: commonValidations.password,
});

export const VendorSignInSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export const VerifyVendorSchema = VendorSignUpSchema.extend({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type VendorSignUpInput = z.infer<typeof VendorSignUpSchema>;
export type VendorSignInInput = z.infer<typeof VendorSignInSchema>;
export type VerifyVendorInput = z.infer<typeof VerifyVendorSchema>;
