'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { ApiError } from '@/lib/core/http/error';
import { type User } from '@repo/types/user';

export async function signUp(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm_password') as string;

  // Validate password confirmation
  if (password !== confirmPassword) {
    return {
      data: null,
      success: false,
      message: 'Passwords do not match',
    };
  }

  try {
    const response = await api.post<{
      accessToken: string;
      user: User;
    }>(
      serverPaths.auth.signUp,
      { email, password },
      {
        skipAuth: true,
      }
    );

    return {
      data: response.data,
      success: true,
      message: response.message,
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
