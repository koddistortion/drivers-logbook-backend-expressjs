import { nameCheck, optionalBody } from './baseValidator.js';

export const addressLine1Check = (optional: boolean = false) => {
  return optionalBody('addressLine1', optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('You must provide a addressLine1');
};

export const addressLine2Check = (optional: boolean = false) => {
  return optionalBody('addressLine2', optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('You must provide a addressLine2');
};

export const zipCodeCheck = (optional: boolean = false) => {
  return optionalBody('zipCode', optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('You must provide a zipCode');
};

export const countryCheck = (optional: boolean = false) => {
  return optionalBody('country', optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('You must provide a country');
};

export const cityCheck = (optional: boolean = false) => {
  return optionalBody('city', optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('You must provide a city');
};

export const postAddressValidation = [
  nameCheck(),
  addressLine1Check(),
  addressLine2Check(true),
  zipCodeCheck(),
  cityCheck(),
  countryCheck(true),
];
export const putAddressValidation = postAddressValidation;

export const patchAddressValidation = [
  nameCheck(true),
  addressLine1Check(true),
  addressLine2Check(true),
  zipCodeCheck(true),
  cityCheck(true),
  countryCheck(true),
];
