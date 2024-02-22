import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/httpError.js";

const handleError = (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  const data = error.data;
  const errors = error.errors;
  return res.status(status).json({
    status: status,
    message: message,
    data: data,
    errors: errors,
  });
};

export default handleError;
