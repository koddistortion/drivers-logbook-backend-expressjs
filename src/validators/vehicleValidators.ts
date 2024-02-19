import { checkSchema } from "express-validator";

export const postVehicleValidation = () =>
  checkSchema({
    name: {
      isString: true,
      trim: true,
      notEmpty: true,
    },
    brand: {
      isString: true,
      trim: true,
      notEmpty: true,
    },
  });
