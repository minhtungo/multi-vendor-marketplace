import { users } from '@/db/schemas';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const userSchema = createSelectSchema(users).omit({
  password: true,
});
export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);
export const updateUserSchema = createUpdateSchema(users);

export type User = z.infer<typeof userSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

// Params and body validation schemas
export const GetUserByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const GetUserByEmailSchema = z.object({
  params: z.object({
    email: z.string().email(),
  }),
});

export const CreateUserSchema = z.object({
  body: insertUserSchema,
});

export const VerifyPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export type GetUserByIdInput = z.infer<typeof GetUserByIdSchema>;
export type GetUserByEmailInput = z.infer<typeof GetUserByEmailSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type VerifyPasswordInput = z.infer<typeof VerifyPasswordSchema>;
