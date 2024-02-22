import express from 'express';

import vehicleController from '../controllers/vehicleController.js';
import { MongoIdCheck } from '../middlewares/mongo.js';
import {
  patchVehicleValidation,
  postVehicleValidation,
} from '../validators/vehicleValidators.js';
import { handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

router.get('/', vehicleController.getVehicles);

router.get('/:id', MongoIdCheck('id'), vehicleController.getVehicle);

router.delete('/:id', MongoIdCheck('id'), vehicleController.deleteVehicle);

router.post(
  '/',
  postVehicleValidation(),
  handleValidationErrors,
  vehicleController.postVehicle,
);

router.patch(
  '/:id',
  MongoIdCheck('id'),
  patchVehicleValidation(),
  handleValidationErrors,
  vehicleController.patchVehicle,
);

export const vehicleRouter = router;
