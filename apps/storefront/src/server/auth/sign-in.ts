'use server';

import { clientPaths } from '@/configs/paths';
import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { setAuthToken } from '@/lib/cookies';
import { type User } from '@repo/types/user';
import { ApiError } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

export async function signIn(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await api.post<{
      accessToken: string;
      user: User;
    }>(
      serverPaths.auth.signIn,
      { email, password },
      {
        skipAuth: true,
      }
    );

    if (response.data && response.data.accessToken) {
      await setAuthToken(response.data.accessToken);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        data: null,
        success: false,
        message: error.message,
      };
    }
  }

  redirect(clientPaths.home);
}
