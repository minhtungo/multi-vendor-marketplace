import { db } from '@/db';
import { discountCodes, InsertDiscountCode } from '@/db/schemas';
import { eq } from 'drizzle-orm';

export class DiscountCodeRepository {
  constructor(private readonly dbInstance = db) {}

  public async createDiscountCode(discountCodeData: InsertDiscountCode, trx: typeof db = this.dbInstance) {
    const [discountCode] = await trx.insert(discountCodes).values(discountCodeData).returning();
    return discountCode;
  }

  public async deleteDiscountCode(id: number, trx: typeof db = this.dbInstance) {
    const [discountCode] = await trx.delete(discountCodes).where(eq(discountCodes.id, id)).returning();
    return discountCode;
  }
}

export const discountCodeRepository = new DiscountCodeRepository();
