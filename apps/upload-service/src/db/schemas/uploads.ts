import { uuid } from 'drizzle-orm/pg-core';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const uploads = pgTable('uploads', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  key: text().notNull(), // S3/MinIO file key
  fileName: text().notNull(),
  mimeType: text().notNull(),
  size: text(),
  url: text(),
  userId: uuid().notNull(),
  createdAt: timestamp({ mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
});
