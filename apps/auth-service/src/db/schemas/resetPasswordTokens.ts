import crypto from 'node:crypto';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const resetPasswordTokens = pgTable('resetPasswordTokens', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  token: text().notNull(),
  expires: timestamp({ mode: 'date' }).notNull(),
  userId: uuid(),
});
