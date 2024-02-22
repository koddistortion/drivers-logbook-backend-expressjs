import { HttpError } from "../httpError.js";

export class NotImplementedError extends HttpError {
  constructor() {
    super("This feature is not implemented yet!");
    this.status = 501;
  }
}
