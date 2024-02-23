import {
  patchAddressValidation,
  postAddressValidation,
  putAddressValidation,
} from './adressValidator.js';

export default {
  validatePostCarWash: postAddressValidation,
  validatePutCarWash: putAddressValidation,
  validatePatchCarWash: patchAddressValidation,
};
