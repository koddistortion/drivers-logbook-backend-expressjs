import { ValidationError } from 'express-validator';
import { HttpError } from '../httpError.js';

export class ValidationFailedError extends HttpError {
  constructor(validationErrors?: ValidationError[], data?: unknown) {
    super('Validation failed!');
    this.status = 422;
    if (validationErrors && validationErrors.length > 0) {
      this.errors = validationErrors;
    }
    if (data) {
      this.data = data;
    }
  }
}
