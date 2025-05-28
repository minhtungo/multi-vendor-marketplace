'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { ApiError } from 'next/dist/server/api-utils';

export async function verifyUser(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const otp = formData.get('otp') as string;

  try {
    const response = await api.put<null>(
      serverPaths.auth.verifyUser,
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
