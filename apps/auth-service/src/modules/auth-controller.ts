import { NextFunction, Request, Response } from 'express';

export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
    name,
    phone,
    address,
    city,
    state,
    zip,
    country,
    role,
  } = req.body;
};
