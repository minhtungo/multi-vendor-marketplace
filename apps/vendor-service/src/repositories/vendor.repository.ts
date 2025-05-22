import { db } from '@/db';
import { type InsertVendor, type Vendor, vendors } from '@/db/schemas/vendors';
import { eq } from 'drizzle-orm';
import { hashPassword } from '@/utils/password';

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

  async createVendor(
    vendor: {
      email: string;
      password: string;
      name: string;
      status: 'pending' | 'active' | 'suspended';
    },
    trx: typeof db = this.dbInstance
  ) {
    const { password, ...vendorData } = vendor;
    const hashedPassword = await hashPassword(password);
    const [newVendor] = await trx
      .insert(vendors)
      .values({
        ...vendorData,
        password: hashedPassword,
      })
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

  async updateVendorPassword(email: string, password: string, trx: typeof db = this.dbInstance): Promise<void> {
    const hashedPassword = await hashPassword(password);
    await trx.update(vendors).set({ password: hashedPassword, updatedAt: new Date() }).where(eq(vendors.email, email));
  }
}

export const vendorRepository = new VendorRepository();
