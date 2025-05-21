import { env } from '@/configs/env';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';
import axios from 'axios';

class UserServiceClient {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = env.USER_SERVICE_URL;
  }

  private async request<T>(method: string, endpoint: string, data?: any): Promise<ServiceResponse<T | null>> {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || ServiceResponse.failure('Failed to communicate with user service', null);
      }
      return ServiceResponse.failure('An unexpected error occurred', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByEmail(email: string) {
    const response = await this.request<Express.User | null>('GET', `/api/users/email/${email}`);
    return response.data;
  }

  async getUserById(id: string) {
    const response = await this.request<Express.User | null>('GET', `/api/users/${id}`);
    return response.data;
  }

  async verifyPassword(email: string, password: string) {
    const response = await this.request<{ isValid: boolean }>('POST', '/api/users/verify-password', {
      email,
      password,
    });
    return response.data;
  }
}

export const userServiceClient = new UserServiceClient();
