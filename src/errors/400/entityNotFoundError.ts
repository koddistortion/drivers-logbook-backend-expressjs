import { NotFoundError } from "./notFoundError.js";

export enum Entity {
  Vehicle = "vehicle",
  Driver = "driver",
  Location = "location",
}

export class EntityNotFoundError extends NotFoundError {
  constructor(entity: Entity, id: string) {
    super(`Could not find any ${entity} with an id of '${id}'!`);
    this.status = 404;
  }
}
