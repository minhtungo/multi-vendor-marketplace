import { db } from '@/db';
import { cart } from '@/db/schemas';
import { count, eq } from 'drizzle-orm';
import type { InsertCart, Cart } from '@/db/schemas';

export class CartRepository {
  constructor(private readonly dbInstance = db) {}
}

export const cartRepository = new CartRepository();
