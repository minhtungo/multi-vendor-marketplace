import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '@/db';
import { vendors } from '@/db/schemas/vendors';
import { users } from '@/db/schemas/users';
import { eq } from 'drizzle-orm';
import { hash } from 'bcrypt';
import { createToken } from '@/utils/jwt';

export const vendorAuthController = {
  async signUp(req: Request, res: Response) {
    const { email, password, ...vendorData } = req.body;

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'User with this email already exists',
        data: null,
      });
    }

    // Create user
    const hashedPassword = await hash(password, 10);
    const [user] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        role: 'vendor',
      })
      .returning();

    // Create vendor profile
    const [vendor] = await db
      .insert(vendors)
      .values({
        userId: user.id,
        ...vendorData,
      })
      .returning();

    // Generate JWT token
    const token = createToken(user);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Vendor account created successfully',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        vendor: {
          id: vendor.id,
          name: vendor.name,
          status: vendor.status,
        },
      },
    });
  },
};
