import { db } from '@/db';
import { eq } from 'drizzle-orm';

export class UploadRepository {
  constructor(private readonly dbInstance = db) {}
}

export const uploadRepository = new UploadRepository();
