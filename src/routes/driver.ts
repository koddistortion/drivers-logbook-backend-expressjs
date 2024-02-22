import express from 'express';

import driverController from '../controllers/driverController.js';
import { postDriverValidation } from '../validators/driverValidators.js';
import { MongoIdCheck } from '../middlewares/mongo.js';

const router = express.Router();

router.get('/', driverController.getDrivers);
router.get('/:id', MongoIdCheck('id'), driverController.getDriver);
router.delete('/:id', MongoIdCheck('id'), driverController.deleteDriver);
router.post('/', postDriverValidation(), driverController.postDriver);
router.patch('/:id', MongoIdCheck('id'), driverController.patchDriver);

export const driverRouter = router;
