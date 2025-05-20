import { db } from '@/db';
import { type InsertVendor, type Vendor, vendors } from '@/db/schemas/vendors';
import { eq } from 'drizzle-orm';

export class VendorRepository {
  constructor(private readonly dbInstance = db) {}

  async getVendorByEmail(email: string): Promise<Vendor | undefined> {
    return this.dbInstance.query.vendors.findFirst({
      where: eq(vendors.email, email),
    });
  }

  async getVendorById(id: string): Promise<Vendor | undefined> {
    return this.dbInstance.query.vendors.findFirst({
      where: eq(vendors.id, id),
    });
  }

  async createVendor(vendor: InsertVendor, trx: typeof db = this.dbInstance) {
    const [newVendor] = await trx
      .insert(vendors)
      .values({ ...vendor })
      .returning();

    return newVendor;
  }

  async updateVendor(id: string, data: Partial<InsertVendor>, trx: typeof db = this.dbInstance) {
    const [updatedVendor] = await trx
      .update(vendors)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(vendors.id, id))
      .returning();

    return updatedVendor;
  }
}

export const vendorRepository = new VendorRepository();
