import { HttpError } from '../httpError.js';

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}
