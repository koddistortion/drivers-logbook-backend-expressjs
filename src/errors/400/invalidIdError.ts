import { HttpError } from '../httpError.js';
import { ObjectId } from 'mongodb';

export class InvalidIdError extends HttpError {
  constructor(id: number | string | ObjectId) {
    super(`Bad Request: '${id}' is not a valid id!`);
    this.status = 400;
    this.data = {
      invalidId: id,
    };
  }
}
