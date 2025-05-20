import { pgEnum } from 'drizzle-orm/pg-core';

export const accountTypeSchema = pgEnum('type', ['email', 'google', 'facebook']);
