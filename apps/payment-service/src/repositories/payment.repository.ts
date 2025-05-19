import { db } from '@/db';
import { eq } from 'drizzle-orm';

export class PaymentRepository {
  constructor(private readonly dbInstance = db) {}

  public async getAllCategories(trx: typeof db = this.dbInstance) {
    return this.dbInstance.query.productCategories.findMany({
      where: (categories) => eq(categories.isActive, true),
      orderBy: (categories) => categories.name,
    });
  }
}

export const paymentRepository = new PaymentRepository();
