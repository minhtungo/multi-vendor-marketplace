import { z } from 'zod/v4';
import { passwordRegex } from './regex';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
  email: z.email({
    error: (issue) => (issue.input === undefined ? 'Email is required' : 'Not a valid email'),
  }),
  password: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Password is required' : 'Not a valid password string'),
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
