import {
  patchAddressValidation,
  postAddressValidation,
  putAddressValidation,
} from './adressValidator.js';

export default {
  validatePostWorkshop: postAddressValidation,
  validatePutWorkshop: putAddressValidation,
  validatePatchWorkshop: patchAddressValidation,
};
