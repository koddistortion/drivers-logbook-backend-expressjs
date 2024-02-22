import { optionalBody } from "./baseValidator.js";

const nameCheck = (optional: boolean = false) => {
  return optionalBody("name", optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("You must provide a name!");
};

const brandCheck = (optional: boolean = false) => {
  return optionalBody("brand", optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("You must provide a brand!");
};

const licensePlateCheck = (optional: boolean = false) => {
  return optionalBody("licensePlate", optional)
    .isString()
    .isLicensePlate("de-DE")
    .withMessage("Please provide a valid german license plate!")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("You must provide a license plate!");
};

const initialMileageCheck = (optional: boolean = false) => {
  return optionalBody("initialMileage", optional)
    .isInt({ min: 0 })
    .withMessage("The initial mileage must be a positive number!");
};

const postVehicleValidation = [
  nameCheck(),
  brandCheck(),
  licensePlateCheck(),
  initialMileageCheck(true),
];

const putVehicleValidation = postVehicleValidation;

const patchVehicleValidation = [
  nameCheck(true),
  brandCheck(true),
  licensePlateCheck(true),
  initialMileageCheck(true),
];

export default {
  validatePostVehicle: postVehicleValidation,
  validatePutVehicle: putVehicleValidation,
  validatePatchVehicle: patchVehicleValidation,
};
