import { body } from "express-validator";

export const optionalBody = (field: string, optional: boolean) => {
  return optional ? body(field).optional() : body(field);
};
