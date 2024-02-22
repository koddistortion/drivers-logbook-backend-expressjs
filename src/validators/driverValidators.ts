import { checkSchema } from 'express-validator';

export const postDriverValidation = () =>
  checkSchema({
    firstName: {
      isString: true,
      trim: true,
      notEmpty: true,
    },
    lastName: {
      isString: true,
      trim: true,
      notEmpty: true,
    },
  });
