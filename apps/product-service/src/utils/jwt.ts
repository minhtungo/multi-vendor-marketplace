import jwt from 'jsonwebtoken';
import { type User } from '@/db/schemas/users';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const createToken = (user: User) => {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      userId: user.id,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};
