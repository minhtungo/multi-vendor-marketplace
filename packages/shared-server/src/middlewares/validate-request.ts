import type { NextFunction, Request, Response } from 'express';

import { z, type ZodError, type ZodType } from 'zod/v4';
import { HTTP_STATUS_CODES } from '../core';
import { ServiceResponse } from '../lib';

export const validateRequest = (schema: ZodType) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const prettyError = z.prettifyError(err as ZodError);
    const serviceResponse = ServiceResponse.failure(prettyError, null, HTTP_STATUS_CODES.BAD_REQUEST);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  }
};
