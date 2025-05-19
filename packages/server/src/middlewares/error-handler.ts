import type { ErrorRequestHandler, RequestHandler } from 'express';
import { HTTP_STATUS_CODES } from '../lib/http-status-codes';
import { AppError } from '../lib/errors';
import { ServiceResponse } from '../lib/service-response';

const unexpectedRequest: RequestHandler = (_req, res) => {
  const response = ServiceResponse.failure('Not Found', null, HTTP_STATUS_CODES.NOT_FOUND);
  res.status(response.statusCode).json(response);
};

const errorHandler: ErrorRequestHandler = (err, _req, res, _) => {
  // Handle known error types
  if (err instanceof AppError) {
    const response = ServiceResponse.failure(err.message, null, err.statusCode);
    res.status(response.statusCode).json(response);
    return;
  }

  // Handle unknown errors
  const response = ServiceResponse.failure(
    'Internal Server Error',
    process.env.NODE_ENV === 'development' ? err.message : null,
    HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
  );
  res.status(response.statusCode).json(response);
};

export default (): [RequestHandler, ErrorRequestHandler] => [unexpectedRequest, errorHandler];
