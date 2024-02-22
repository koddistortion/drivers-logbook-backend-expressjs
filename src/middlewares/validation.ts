import { Request, Response, NextFunction } from 'express';
import { ValidationFailedError } from '../errors/400/validationFailedError.js';
import { validationResult } from 'express-validator';

export const handleValidationErrors = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(new ValidationFailedError(validationErrors.array(), req.body));
  }
  next();
};
