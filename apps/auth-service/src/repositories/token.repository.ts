import { tokenConfig } from '@/configs/token';
import { db } from '@/db';
import {
  resetPasswordTokens,
  twoFactorConfirmations,
  twoFactorTokens,
  verificationTokens,
} from '@/db/schemas';
import { generateToken } from '@/lib/token';
import { eq } from 'drizzle-orm';

const getVerificationTokenByUserId = async (userId: string) => {
  const token = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.userId, userId),
  });

  return token;
};

const getVerificationTokenByToken = async (token: string) => {
  const verificationToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  return verificationToken;
};

const getTwoFactorTokenByEmail = async (email: string) => {
  const twoFactorToken = await db.query.twoFactorTokens.findFirst({
    where: eq(twoFactorTokens.email, email),
  });

  return twoFactorToken;
};

const deleteVerificationTokenByToken = async (
  token: string,
  trx: typeof db = db
) => {
  await trx
    .delete(verificationTokens)
    .where(eq(verificationTokens.token, token));
};

const deleteResetPasswordTokenByToken = async (
  token: string,
  trx: typeof db = db
) => {
  await trx
    .delete(resetPasswordTokens)
    .where(eq(resetPasswordTokens.token, token));
};

const deleteTwoFactorTokenByToken = async (
  token: string,
  trx: typeof db = db
) => {
  await trx.delete(twoFactorTokens).where(eq(twoFactorTokens.token, token));
};

const deleteTwoFactorConfirmation = async (id: string, trx: typeof db = db) => {
  await trx
    .delete(twoFactorConfirmations)
    .where(eq(twoFactorConfirmations.id, id));
};

const createTwoFactorConfirmation = async (
  userId: string,
  trx: typeof db = db
) => {
  await trx.insert(twoFactorConfirmations).values({
    userId,
  });
};

const createResetPasswordToken = async (
  userId: string,
  trx: typeof db = db
) => {
  const token = await generateToken(tokenConfig.resetPasswordToken.length);
  const expires = new Date(
    Date.now() + tokenConfig.resetPasswordToken.maxAgeInSeconds
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
};

const getResetPasswordTokenByToken = async (token: string) => {
  const resetPasswordToken = await db.query.resetPasswordTokens.findFirst({
    where: eq(resetPasswordTokens.token, token),
  });

  return resetPasswordToken;
};

const getTwoFactorConfirmationByUserId = async (userId: string) => {
  const twoFactorConfirmation = await db.query.twoFactorConfirmations.findFirst(
    {
      where: eq(twoFactorConfirmations.userId, userId),
    }
  );

  return twoFactorConfirmation;
};

export const tokenRepository = {
  getVerificationTokenByUserId,
  getVerificationTokenByToken,
  getTwoFactorTokenByEmail,
  deleteVerificationTokenByToken,
  deleteResetPasswordTokenByToken,
  deleteTwoFactorTokenByToken,
  deleteTwoFactorConfirmation,
  createTwoFactorConfirmation,
  createResetPasswordToken,
  getResetPasswordTokenByToken,
  getTwoFactorConfirmationByUserId,
};
