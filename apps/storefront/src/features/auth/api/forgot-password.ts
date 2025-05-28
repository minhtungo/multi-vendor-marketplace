'use server';

import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { ApiError } from '@/lib/core/http/error';

export async function forgotPassword(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;

  try {
    const response = await api.post<{
      message: string;
    }>(
      server.path.auth.forgotPassword,
      { email },
      {
        skipAuth: true,
      }
    );

    return {
      data: response.data,
      success: true,
      message: response.message || 'Password reset link sent to your email.',
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

  return {
    data: null,
    success: false,
    message: 'An unexpected error occurred.',
  };
}
