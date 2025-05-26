import type { ApiResponse } from '@repo/types/api';
import type { AxiosError } from 'axios';

export function normalizeServerError(error: unknown, defaultMessage = 'An error occurred'): string {
  if (!error) return defaultMessage;

  if (error instanceof Error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return defaultMessage;
}
