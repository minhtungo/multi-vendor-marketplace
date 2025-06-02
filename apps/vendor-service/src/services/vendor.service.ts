import { VendorRepository } from '@/repositories/vendor.repository';
import { ServiceResponse, executeWithErrorHandling } from '@repo/shared-server/lib';
import { HTTP_STATUS_CODES } from '@repo/shared-server/core';
import { logger } from '@/utils/logger';
import { verifyPassword } from '@/utils/password';

export class VendorService {
  private vendorRepository: VendorRepository;

  constructor(repository: VendorRepository = new VendorRepository()) {
    this.vendorRepository = repository;
  }

  public async getVendorById(id: string): Promise<ServiceResponse<any>> {
    return executeWithErrorHandling(
      'getVendorById',
      async () => {
        const vendor = await this.vendorRepository.getVendorById(id);
        if (!vendor) {
          return ServiceResponse.failure('Vendor not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }
        const { password, ...vendorWithoutPassword } = vendor;
        return ServiceResponse.success('Vendor found', vendorWithoutPassword);
      },
      logger
    );
  }

  public async getVendorByEmail(email: string): Promise<ServiceResponse<any>> {
    return executeWithErrorHandling(
      'getVendorByEmail',
      async () => {
        const vendor = await this.vendorRepository.getVendorByEmail(email);
        if (!vendor) {
          return ServiceResponse.failure('Vendor not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }
        const { password, ...vendorWithoutPassword } = vendor;
        return ServiceResponse.success('Vendor found', vendorWithoutPassword);
      },
      logger
    );
  }

  public async verifyPassword(email: string, password: string) {
    const vendor = await this.vendorRepository.getVendorByEmail(email);
    if (!vendor) {
      return ServiceResponse.failure('Vendor not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }

    if (!vendor.password) {
      return ServiceResponse.failure('Vendor has no password set', null, HTTP_STATUS_CODES.BAD_REQUEST);
    }

    const isValid = await verifyPassword(vendor.password, password);
    return ServiceResponse.success('Password verification completed', { isValid }, HTTP_STATUS_CODES.OK);
  }
}

export const vendorService = new VendorService();
