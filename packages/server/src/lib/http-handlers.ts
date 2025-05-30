import type { Response } from 'express';

import { ServiceResponse } from './service-response';
import { HTTP_STATUS_CODES } from '../core';

export const handleServiceResponse = <T>(serviceResponse: ServiceResponse<T>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const handleServiceError = ({
  errorEvent,
  error,
  logger,
}: {
  errorEvent: string;
  error: Error;
  logger: any;
}) => {
  const errorMessage = `Error ${errorEvent}: ${(error as Error).message}`;
  logger.error(errorMessage);
  return ServiceResponse.failure(
    `An error occurred during ${errorEvent}.`,
    null,
    HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
  );
};

/**
 * A utility function to execute service methods with standardized error handling
 * @param methodName - The name of the method for logging purposes
 * @param operation - The async operation to execute
 * @param logger - The logger instance
 * @returns Promise<ServiceResponse<T>>
 *
 * @example
 * // Basic usage - Simple CRUD operation
 * public async createUser(userData: CreateUserInput): Promise<ServiceResponse<User | null>> {
 *   return executeWithErrorHandling('createUser', async () => {
 *     const user = await this.userRepo.create(userData);
 *     return ServiceResponse.success('User created successfully', user, HTTP_STATUS_CODES.CREATED);
 *   }, logger);
 * }
 *
 * @example
 * // With validation and business logic
 * public async updateProduct(id: string, data: UpdateProductInput): Promise<ServiceResponse<Product | null>> {
 *   return executeWithErrorHandling('updateProduct', async () => {
 *     const existingProduct = await this.productRepo.findById(id);
 *     if (!existingProduct) {
 *       return ServiceResponse.failure('Product not found', null, HTTP_STATUS_CODES.NOT_FOUND);
 *     }
 *
 *     const updatedProduct = await this.productRepo.update(id, data);
 *     return ServiceResponse.success('Product updated successfully', updatedProduct, HTTP_STATUS_CODES.OK);
 *   }, logger);
 * }
 *
 * @example
 * // Complex operation with multiple steps
 * public async processOrder(orderData: CreateOrderInput): Promise<ServiceResponse<Order | null>> {
 *   return executeWithErrorHandling('processOrder', async () => {
 *     // Step 1: Validate inventory
 *     const inventory = await this.inventoryService.checkAvailability(orderData.items);
 *     if (!inventory.available) {
 *       return ServiceResponse.failure('Insufficient inventory', null, HTTP_STATUS_CODES.BAD_REQUEST);
 *     }
 *
 *     // Step 2: Calculate totals
 *     const totals = await this.calculationService.calculateOrderTotals(orderData);
 *
 *     // Step 3: Create order
 *     const order = await this.orderRepo.create({ ...orderData, ...totals });
 *
 *     // Step 4: Update inventory
 *     await this.inventoryService.reserveItems(orderData.items);
 *
 *     return ServiceResponse.success('Order processed successfully', order, HTTP_STATUS_CODES.CREATED);
 *   }, logger);
 * }
 *
 * @example
 * // Paginated results
 * public async getProducts(page: number, limit: number): Promise<ServiceResponse<PaginatedResult<Product> | null>> {
 *   return executeWithErrorHandling('getProducts', async () => {
 *     const result = await this.productRepo.findPaginated(page, limit);
 *     return ServiceResponse.success('Products retrieved successfully', result, HTTP_STATUS_CODES.OK);
 *   }, logger);
 * }
 *
 * @example
 * // With external API calls
 * public async sendNotification(userId: string, message: string): Promise<ServiceResponse<null>> {
 *   return executeWithErrorHandling('sendNotification', async () => {
 *     const user = await this.userRepo.findById(userId);
 *     if (!user) {
 *       return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.NOT_FOUND);
 *     }
 *
 *     await this.emailService.send(user.email, message);
 *     await this.notificationRepo.log(userId, message);
 *
 *     return ServiceResponse.success('Notification sent successfully', null, HTTP_STATUS_CODES.OK);
 *   }, logger);
 */
export const executeWithErrorHandling = async <T>(
  methodName: string,
  operation: () => Promise<ServiceResponse<T>>,
  logger: any
): Promise<ServiceResponse<T>> => {
  try {
    return await operation();
  } catch (error) {
    return handleServiceError({
      errorEvent: methodName,
      error: error as Error,
      logger,
    }) as ServiceResponse<T>;
  }
};
