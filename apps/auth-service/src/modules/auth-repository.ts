import { tokenConfig } from '@/configs/token';
import { db } from '@/db';
import {
  accounts,
  InsertAccount,
  resetPasswordTokens,
  twoFactorConfirmations,
  twoFactorTokens,
  verificationTokens,
} from '@/db/schemas';

import { type InsertUser, type User, users } from '@/db/schemas/users';
import { hashPassword } from '@/utils/password';
import { generateToken } from '@/utils/token';

import { eq } from 'drizzle-orm';

export class AuthRepository {
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

  async getVerificationTokenByUserId(userId: string) {
    const token = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.userId, userId),
    });

    return token;
  }

  async getVerificationTokenByToken(token: string) {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.token, token),
    });

    return verificationToken;
  }

  async getTwoFactorTokenByEmail(email: string) {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.email, email),
    });

    return twoFactorToken;
  }

  async getAccountByUserId(userId: string) {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.userId, userId),
    });

    return account;
  }

  async deleteVerificationTokenByToken(token: string, trx: typeof db = db) {
    await trx
      .delete(verificationTokens)
      .where(eq(verificationTokens.token, token));
  }

  async deleteResetPasswordTokenByToken(token: string, trx: typeof db = db) {
    await trx
      .delete(resetPasswordTokens)
      .where(eq(resetPasswordTokens.token, token));
  }

  async deleteTwoFactorTokenByToken(token: string, trx: typeof db = db) {
    await trx.delete(twoFactorTokens).where(eq(twoFactorTokens.token, token));
  }

  async deleteTwoFactorConfirmation(id: string, trx: typeof db = db) {
    await trx
      .delete(twoFactorConfirmations)
      .where(eq(twoFactorConfirmations.id, id));
  }

  async createVerificationEmailToken(userId: string, trx: typeof db = db) {
    const token = await generateToken(tokenConfig.verificationToken.length);
    const expires = new Date(Date.now() + tokenConfig.verificationToken.maxAge);

    await trx
      .insert(verificationTokens)
      .values({
        userId,
        token,
        expires,
      })
      .onConflictDoUpdate({
        target: verificationTokens.id,
        set: {
          token,
          expires,
        },
      });

    return token;
  }

  async createTwoFactorConfirmation(userId: string, trx: typeof db = db) {
    await trx.insert(twoFactorConfirmations).values({
      userId,
    });
  }

  async createResetPasswordToken(userId: string, trx: typeof db = db) {
    const token = await generateToken(tokenConfig.resetPasswordToken.length);
    const expires = new Date(
      Date.now() + tokenConfig.resetPasswordToken.maxAge
    );

    await trx
      .insert(resetPasswordTokens)
      .values({
        userId,
        token,
        expires,
      })
      .onConflictDoUpdate({
        target: resetPasswordTokens.id,
        set: {
          token,
          expires,
        },
      });

    return token;
  }

  async getResetPasswordTokenByToken(token: string) {
    const resetPasswordToken = await db.query.resetPasswordTokens.findFirst({
      where: eq(resetPasswordTokens.token, token),
    });

    return resetPasswordToken;
  }

  async getTwoFactorConfirmationByUserId(userId: string) {
    const twoFactorConfirmation =
      await db.query.twoFactorConfirmations.findFirst({
        where: eq(twoFactorConfirmations.userId, userId),
      });

    return twoFactorConfirmation;
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

  async createAccount(account: InsertAccount, trx: typeof db = db) {
    await trx.insert(accounts).values(account);
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

export const authRepository = new AuthRepository();
