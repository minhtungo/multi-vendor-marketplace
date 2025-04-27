import { pgEnum } from 'drizzle-orm/pg-core';

export const roleSchema = pgEnum('role', ['customer', 'seller']);
export const accountTypeSchema = pgEnum('type', [
  'email',
  'google',
  'facebook',
]);
