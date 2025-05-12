import { z } from 'zod';
import { commonValidations } from './common';

export const VendorSignUpSchema = z.object({
  email: commonValidations.email,
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  website: z.string().url().optional(),
});

export const VerifyVendorSchema = z.object({
  email: commonValidations.email,
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type VendorSignUpInput = z.infer<typeof VendorSignUpSchema>;
export type VerifyVendorInput = z.infer<typeof VerifyVendorSchema>;
