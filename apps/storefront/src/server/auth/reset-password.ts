'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { ApiError } from '@/lib/core/http/error';
import { type ApiResponse } from '@repo/types/api';

export async function resetPassword(_prevState: unknown, formData: FormData) {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm_password') as string;
  const token = formData.get('token') as string;

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
      message: string;
    }>(
      serverPaths.auth.resetPassword + '/' + token,
      { password },
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

export async function verifyResetPasswordToken(token: string): Promise<
  ApiResponse<{
    isValid: boolean;
  }>
> {
  return api.get(server.path.auth.resetPassword + '/verify/' + token, {
    skipAuth: true,
  });
}
