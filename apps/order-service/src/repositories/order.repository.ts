import { db } from '@/db';
import { orders } from '@/db/schemas';
import { count, eq } from 'drizzle-orm';
import type { InsertOrder, Order } from '@/db/schemas';

export class OrderRepository {
  constructor(private readonly dbInstance = db) {}

  public async getPaginatedOrders(page: number, limit: number, trx: typeof db = this.dbInstance) {
    const offset = (page - 1) * limit;

    const [{ value: total }] = await trx.select({ value: count() }).from(orders);

    const items = await trx.select().from(orders).limit(limit).offset(offset).orderBy(orders.createdAt);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async getOrderById(id: number, trx: typeof db = this.dbInstance) {
    const order = await trx.query.orders.findFirst({
      where: eq(orders.id, id),
    });
    return order;
  }

  public async createOrder(orderData: InsertOrder, trx: typeof db = this.dbInstance) {
    const [order] = await trx.insert(orders).values(orderData).returning();
    return order;
  }
}

export const orderRepository = new OrderRepository();
