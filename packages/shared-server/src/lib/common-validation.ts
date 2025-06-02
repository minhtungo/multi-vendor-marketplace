import { z } from 'zod';
import { passwordRegex } from './regex';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password must be at most 64 characters')
    .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  price: z
    .string()
    .regex(/^\d+\.?\d{0,2}$/, 'Invalid price format')
    .transform(String),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
};
