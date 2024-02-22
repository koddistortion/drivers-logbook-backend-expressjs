import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { InvalidIdError } from '../errors/400/invalidIdError.js';

export const MongoIdCheck =
  (paramName: string) => (req: Request, _res: Response, next: NextFunction) => {
    const paramId = req.params[paramName] ?? '?';
    if (!mongoose.Types.ObjectId.isValid(paramId)) {
      throw new InvalidIdError(paramId);
    }
    next();
  };
