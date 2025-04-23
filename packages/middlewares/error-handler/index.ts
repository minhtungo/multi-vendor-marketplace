import { Request, Response } from 'express';
import { AppError } from './error-handler';

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
