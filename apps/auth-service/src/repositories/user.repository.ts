import { db } from '@/db';
import { type InsertUser, type User, users } from '@/db/schemas/users';
import { hashPassword } from '@/utils/password';
import { eq } from 'drizzle-orm';

export class UserRepository {
  async getUserByEmail(email: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    return user;
  }

  async getUserById(id: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    return user;
  }

  async createUser(user: InsertUser, trx: typeof db = db): Promise<User> {
    const { password, ...data } = user;
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const [newUser] = await trx
      .insert(users)
      .values({ ...data, password: hashedPassword })
      .returning();

    return newUser;
  }

  async updateUserEmailVerified(userId: string, trx: typeof db = db) {
    await trx
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, userId));
  }

  async updateUserPassword(
    userId: string,
    password: string,
    trx: typeof db = db
  ) {
    const hashedPassword = await hashPassword(password);
    await trx
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId));
  }
}
