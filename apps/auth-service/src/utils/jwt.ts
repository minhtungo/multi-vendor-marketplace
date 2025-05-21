import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const createToken = (user: Express.User) => {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};
