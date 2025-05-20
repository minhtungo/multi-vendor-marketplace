import crypto from 'crypto';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  email: text().notNull(),
  password: text(),
  image: text(),
  role: text().notNull().default('user'),
});
