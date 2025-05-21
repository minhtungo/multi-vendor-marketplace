import crypto from 'node:crypto';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const verificationTokens = pgTable('verificationTokens', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  token: text().notNull(),
  expires: timestamp({ mode: 'date' }).notNull(),
  userId: uuid(),
});
