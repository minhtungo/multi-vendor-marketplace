import { env } from '@/configs/env';
import { verify } from 'jsonwebtoken';

type DecodedToken = {
  sub: string;
  email: string;
  userId: string;
  role: 'user' | 'vendor';
};

export const extractAndVerifyToken = (authHeader: string | undefined): Express.User | null => {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return null;
  }

  try {
    const decoded = verify(token, env.JWT_SECRET) as DecodedToken;
    return {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
};
