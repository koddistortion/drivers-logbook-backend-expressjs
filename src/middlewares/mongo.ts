import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import {InvalidIdError} from "../errors/400/invalidIdError";

export const MongoIdCheck = (paramName: String) => (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const paramId = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(paramId)) {
        throw new InvalidIdError(paramId);
    }
    next();
};

