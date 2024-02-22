import { optionalBody } from "./baseValidator.js";

const firstNameCheck = (optional: boolean = false) => {
  return optionalBody("firstName", optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("You must provide a first name!");
};

const lastNameCheck = (optional: boolean = false) => {
  return optionalBody("lastName", optional)
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("You must provide a last name!");
};

const postDriverValidation = [firstNameCheck(), lastNameCheck()];

const putDriverValidation = postDriverValidation;

const patchDriverValidation = [firstNameCheck(true), lastNameCheck(true)];

export default {
  validatePostDriver: postDriverValidation,
  validatePutDriver: putDriverValidation,
  validatePatchDriver: patchDriverValidation,
};
