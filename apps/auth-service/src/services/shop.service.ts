import type { InsertShop, Shop } from '@/db/schemas/shops';
import { shopRepository } from '@/repositories/shop.repository';
import { vendorRepository } from '@/repositories/vendor.repository';
import { logger } from '@/utils/logger';
import { ServiceResponse } from '@repo/server/lib/service-response';
import type { NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

class ShopService {
  public async createShop(
    data: InsertShop,
    vendorId: string,
    next: NextFunction
  ): Promise<ServiceResponse<Shop | null>> {
    try {
      const vendor = await vendorRepository.getVendorById(vendorId);

      if (!vendor) {
        return ServiceResponse.failure('Vendor not found', null, StatusCodes.NOT_FOUND);
      }

      await shopRepository.createShop({
        ...data,
        vendorId,
      });

      return ServiceResponse.success('Shop created successfully', null, StatusCodes.CREATED);
    } catch (error) {
      const errorMessage = `Error creating shop: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const shopService = new ShopService();
