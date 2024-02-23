import {
  patchAddressValidation,
  postAddressValidation,
  putAddressValidation,
} from './adressValidator.js';

export default {
  validatePostGasStation: postAddressValidation,
  validatePutGasStation: putAddressValidation,
  validatePatchGasStation: patchAddressValidation,
};
