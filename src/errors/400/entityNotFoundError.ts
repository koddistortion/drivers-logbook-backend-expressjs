import { NotFoundError } from './notFoundError.js';

export enum Entity {
  Vehicle = 'vehicle',
  Driver = 'driver',
  Location = 'location',
}

export class EntityNotFoundError extends NotFoundError {
  constructor(entity: Entity, id: string) {
    super(`No ${entity} with id of '${id} was found!`);
    this.status = 404;
  }
}
