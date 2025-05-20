import { db } from '@/db';
import { InsertUpload, uploads } from '@/db/schemas';
import { desc, eq } from 'drizzle-orm';

export class UploadRepository {
  async createFileUpload(data: InsertUpload) {
    const [newFileUpload] = await db.insert(uploads).values(data).returning();
    return newFileUpload;
  }

  async getFileUploadsByUserId(userId: string, offset = 0, limit = 30) {
    const upload = await db.query.uploads.findMany({
      where: eq(uploads.userId, userId),
      orderBy: (uploads) => [desc(uploads.createdAt)],
      offset,
      limit,
    });
    return upload;
  }

  async getFileUploadById(id: string) {
    const fileUpload = await db.query.uploads.findFirst({
      where: eq(uploads.id, id),
    });
    return fileUpload;
  }

  async deleteFileUpload(id: string) {
    await db.delete(uploads).where(eq(uploads.id, id));
  }
}

export const uploadRepository = new UploadRepository();
