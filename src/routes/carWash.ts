import express from 'express';
import dbMiddleware from '../middlewares/mongo.js';
import controller from '../controllers/carWashController.js';
import requestValidation from '../validators/carWashValidators.js';
import validationMiddleware from '../middlewares/validation.js';

const router = express.Router();

router.get('/', controller.getCarWashes);

router.get('/:id', dbMiddleware.checkForValidId('id'), controller.getCarWash);

router.delete(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  controller.deleteCarWash,
);

router.post(
  '/',
  requestValidation.validatePostCarWash,
  validationMiddleware.checkForErrors,
  controller.postCarWash,
);

router.put(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  requestValidation.validatePutCarWash,
  validationMiddleware.checkForErrors,
  controller.putCarWash,
);

router.patch(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  requestValidation.validatePatchCarWash,
  validationMiddleware.checkForErrors,
  controller.patchCarWash,
);
export default router;
