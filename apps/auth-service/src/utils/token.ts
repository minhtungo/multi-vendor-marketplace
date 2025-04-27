import crypto from 'crypto';

export const generateToken = async (length = 32): Promise<string> => {
  const buffer = await crypto.randomBytes(Math.ceil(length * 0.75));

  return buffer.toString('base64url').slice(0, length);
};
