import express from 'express';
import dbMiddleware from '../middlewares/mongo.js';
import controller from '../controllers/workshopController.js';
import requestValidation from '../validators/workshopValidators.js';
import validationMiddleware from '../middlewares/validation.js';

const router = express.Router();

router.get('/', controller.getWorkshops);

router.get('/:id', dbMiddleware.checkForValidId('id'), controller.getWorkshop);

router.delete(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  controller.deleteWorkshop,
);

router.post(
  '/',
  requestValidation.validatePostWorkshop,
  validationMiddleware.checkForErrors,
  controller.postWorkshop,
);

router.put(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  requestValidation.validatePutWorkshop,
  validationMiddleware.checkForErrors,
  controller.putWorkshop,
);

router.patch(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  requestValidation.validatePatchWorkshop,
  validationMiddleware.checkForErrors,
  controller.patchWorkshop,
);
export default router;
