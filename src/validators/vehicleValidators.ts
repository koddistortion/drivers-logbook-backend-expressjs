import { body } from 'express-validator';

export const postVehicleValidation = () => {
  return [
    body('name')
      .isString()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('You must provide a name!'),
    body('brand')
      .isString()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('You must provide a brand!'),
    body('licensePlate')
      .isString()
      .isLicensePlate('de-DE')
      .withMessage('Please provide a valid german license plate!')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('You must provide a license plate!'),
    body('initialMileage')
      .isInt({ min: 0 })
      .withMessage('The initial mileage must be a positive number!')
      .optional(),
  ];
};

export const patchVehicleValidation = () => {
  return [
    body('name')
      .optional()
      .isString()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('You must provide a name!'),
    body('brand')
      .optional()
      .isString()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('You must provide a brand!'),
    body('licensePlate')
      .optional()
      .isString()
      .isLicensePlate('de-DE')
      .withMessage('Please provide a valid german license plate!')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('You must provide a license plate!'),
    body('initialMileage')
      .optional()
      .isInt({ min: 0 })
      .withMessage('The initial mileage must be a positive number!'),
  ];
};
