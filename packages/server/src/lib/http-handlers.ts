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
