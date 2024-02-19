import express from "express";

import vehicleController from "../controllers/vehicleController";
import {postVehicleValidation} from "../validators/vehicleValidators";
import {MongoIdCheck} from "../middlewares/mongo";

const router = express.Router();

router.get('/', vehicleController.getVehicles);
router.get('/:id', MongoIdCheck("id"), vehicleController.getVehicle);
router.delete('/:id', MongoIdCheck("id"), vehicleController.deleteVehicle);
router.post('/', postVehicleValidation(), vehicleController.postVehicle);
router.patch('/:id', MongoIdCheck("id"), vehicleController.patchVehicle);

export const vehicleRouter = router;
