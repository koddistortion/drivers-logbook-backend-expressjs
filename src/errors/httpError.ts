import { ValidationError } from 'express-validator';

export class HttpError extends Error {
  public status: number = 500;
  public data: unknown;
  public errors: unknown | ValidationError[];

  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 500;
  }
}
