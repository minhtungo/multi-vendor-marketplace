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

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
});

export type SignInInput = z.infer<typeof SignInSchema>;
