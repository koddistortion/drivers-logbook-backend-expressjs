import express from 'express';
import dbMiddleware from '../middlewares/mongo.js';
import controller from '../controllers/gasStationController.js';
import requestValidation from '../validators/gasStationValidators.js';
import validationMiddleware from '../middlewares/validation.js';

const router = express.Router();

router.get('/', controller.getGasStations);

router.get(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  controller.getGasStation,
);

router.delete(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  controller.deleteGasStation,
);

router.post(
  '/',
  requestValidation.validatePostGasStation,
  validationMiddleware.checkForErrors,
  controller.postGasStation,
);

router.put(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  requestValidation.validatePutGasStation,
  validationMiddleware.checkForErrors,
  controller.putGasStation,
);

router.patch(
  '/:id',
  dbMiddleware.checkForValidId('id'),
  requestValidation.validatePatchGasStation,
  validationMiddleware.checkForErrors,
  controller.patchGasStation,
);
export default router;
