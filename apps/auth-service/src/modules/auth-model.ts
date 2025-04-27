import { commonValidations } from '@packages/utils/commonValidations';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const SignUpSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
  country: z.string().min(1, 'Country is required'),
  role: z.enum(['seller', 'customer']),
});

export type SignUpSchema = z.infer<typeof SignUpSchema>;

export const VerifyEmailSchema = z.object({
  token: z.string(),
});

export const ForgotPasswordSchema = z.object({
  email: commonValidations.email,
});

export const SignInSchema = z.object({
  email: commonValidations.email,
  password: z.string(),
  code: z.string().optional(),
});

export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: commonValidations.password,
});
