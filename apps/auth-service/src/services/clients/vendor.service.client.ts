import { env } from '@/configs/env';
import { HTTP_STATUS_CODES } from '@repo/shared-server/core';
import { ServiceResponse } from '@repo/shared-server/lib';
import axios from 'axios';

class VendorServiceClient {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = env.VENDOR_SERVICE_URL;
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

  async getVendorByEmail(email: string) {
    const response = await this.request<Express.User | null>('GET', `/api/vendors/email/${email}`);
    return response.data;
  }

  async getVendorById(id: string) {
    const response = await this.request<Express.User | null>('GET', `/api/vendors/${id}`);
    return response.data;
  }

  async verifyPassword(email: string, password: string) {
    const response = await this.request<{ isValid: boolean }>('POST', '/api/vendors/verify-password', {
      email,
      password,
    });
    return response.data;
  }
}

export const vendorServiceClient = new VendorServiceClient();
