import { db } from '@/db';
import { orders } from '@/db/schemas';
import type { InsertOrder } from '@/models/order.model';
import { count, eq } from 'drizzle-orm';

export class OrderRepository {
  constructor(private readonly dbInstance = db) {}

  public async getPaginatedOrders(page: number, limit: number, vendorId?: string, trx: typeof db = this.dbInstance) {
    const offset = (page - 1) * limit;

    // Build base query for counting
    const countQuery = trx.select({ value: count() }).from(orders);
    const selectQuery = trx.select().from(orders);

    // Apply vendor filter if vendorId is provided
    if (vendorId) {
      countQuery.where(eq(orders.vendorId, vendorId));
      selectQuery.where(eq(orders.vendorId, vendorId));
    }

    const [{ value: total }] = await countQuery;

    const items = await selectQuery.limit(limit).offset(offset).orderBy(orders.createdAt);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async getOrderById(id: string, trx: typeof db = this.dbInstance) {
    const order = await trx.query.orders.findFirst({
      where: eq(orders.id, id),
    });
    return order;
  }

  public async createOrder(orderData: InsertOrder, trx: typeof db = this.dbInstance) {
    const [order] = await trx
      .insert(orders)
      .values({
        ...orderData,
      })
      .returning();
    return order;
  }
}

export const orderRepository = new OrderRepository();
