import { WebError } from "../webError";
import { ValidationError } from "express-validator";

export class ValidationFailedError extends WebError {
  constructor(validationErrors?: ValidationError[], data?: any) {
    super("Validation failed!");
    this.status = 400;
    if (validationErrors && validationErrors.length > 0) {
      this.errors = validationErrors;
    }
    if (data) {
      this.data = data;
    }
  }
}
