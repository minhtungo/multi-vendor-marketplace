import type { NextFunction, Request, Response } from 'express';

import type { ZodError, ZodSchema } from 'zod';
import { HTTP_STATUS_CODES } from '../core';
import { ServiceResponse } from '../lib';

export const validateRequest = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    console.log(err);
    const zodError = err as ZodError;
    const missingFields = zodError.errors.map((e) => e.path.slice(1).join('.')).join(', ');

    const errorMessage = `Missing required fields: ${missingFields}`;
    const statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  }
};
