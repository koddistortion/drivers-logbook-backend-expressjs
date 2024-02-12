import {Request, Response, NextFunction} from 'express'
import {WebError} from "../errors/webError";

export const handleError = (error: WebError, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message;
    const data = error.data;
    const errors = error.errors;
    res.status(status).json({
        status: status,
        message: message,
        data: data,
        errors: errors
    });
};