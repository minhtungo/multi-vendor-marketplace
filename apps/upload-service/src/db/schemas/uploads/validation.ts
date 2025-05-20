import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { uploads } from './uploads';

export const insertUploadSchema = createInsertSchema(uploads);
export const uploadSchema = createSelectSchema(uploads);

export type InsertUpload = typeof uploads.$inferInsert;
export type Upload = typeof uploads.$inferSelect;
