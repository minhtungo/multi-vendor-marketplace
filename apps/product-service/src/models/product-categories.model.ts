import { insertCategorySchema } from '@/db/schemas';

export const CreateCategorySchema = insertCategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
