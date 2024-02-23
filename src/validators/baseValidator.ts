import { body } from 'express-validator';

export const optionalBody = (field: string, optional: boolean) => {
  return optional ? body(field).optional() : body(field);
};

export const nameCheck = (optional: boolean = false) => {
  return optionalBody('name', optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('You must provide a name!');
};
