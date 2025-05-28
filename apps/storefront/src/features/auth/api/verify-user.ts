'use server';

import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import { ApiError } from 'next/dist/server/api-utils';
import { z } from 'zod';

export const verifyUserSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type VerifyUserInput = z.infer<typeof verifyUserSchema>;

export async function verifyUser(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const otp = formData.get('otp') as string;

  try {
    const response = await api.put<null>(
      server.path.auth.verifyUser,
      { email, password, otp },
      {
        skipAuth: true,
      }
    );

    return {
      data: response.data,
      success: true,
      message: response.message || 'Email verified successfully. You can now sign in.',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        data: null,
        success: false,
        message: error.message,
      };
    }
  }
}
