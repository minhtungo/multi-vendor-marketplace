import { vendors } from '@/db/schemas';
import { commonValidations } from '@repo/shared-server/lib';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const vendorSchema = createSelectSchema(vendors).omit({
  password: true,
});
export const selectVendorSchema = createSelectSchema(vendors);

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

export const verifyPasswordSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type Vendor = z.infer<typeof vendorSchema>;
export type SelectVendor = z.infer<typeof selectVendorSchema>;
export type VendorSignUpInput = z.infer<typeof VendorSignUpSchema>;
export type VendorSignInInput = z.infer<typeof VendorSignInSchema>;
export type VerifyVendorInput = z.infer<typeof VerifyVendorSchema>;

// Params validation schemas
export const GetVendorByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const GetVendorByEmailSchema = z.object({
  params: z.object({
    email: z.string().email(),
  }),
});

export const VerifyPasswordRequestSchema = z.object({
  body: verifyPasswordSchema,
});

// Params validation schemas type
export type GetVendorByIdInput = z.infer<typeof GetVendorByIdSchema>;
export type GetVendorByEmailInput = z.infer<typeof GetVendorByEmailSchema>;
export type VerifyPasswordRequest = z.infer<typeof VerifyPasswordRequestSchema>;
