import { DiscountCode, InsertDiscountCode } from '@/db/schemas';
import { discountCodeRepository } from '@/repositories/discount-code.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';

class DiscountCodeService {
  constructor(private readonly discountCodeRepo = discountCodeRepository) {}

  public async createDiscountCode(discountCodeData: InsertDiscountCode): Promise<ServiceResponse<DiscountCode | null>> {
    try {
      const discountCode = await this.discountCodeRepo.createDiscountCode(discountCodeData);
      return ServiceResponse.success('Discount code created successfully', discountCode, HTTP_STATUS_CODES.CREATED);
    } catch (error) {
      const errorMessage = `Error creating discount code: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteDiscountCode(id: number): Promise<ServiceResponse<null>> {
    try {
      const discountCode = await this.discountCodeRepo.deleteDiscountCode(id);

      if (!discountCode) {
        return ServiceResponse.failure('Discount code not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      return ServiceResponse.success('Discount code deleted successfully', null, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error deleting discount code: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export const discountCodeService = new DiscountCodeService();
