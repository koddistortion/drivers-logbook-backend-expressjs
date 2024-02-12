import express from "express";

const tmpRouter = express.Router();

import vehicleController from "../controllers/vehicleController";
import {postVehicleValidation} from "../validators/vehicleValidators";

tmpRouter.get('/', vehicleController.getVehicles);
tmpRouter.get('/:id', vehicleController.getVehicle);
tmpRouter.delete('/:id', vehicleController.deleteVehicle);
tmpRouter.post('/', postVehicleValidation(), vehicleController.postVehicle);
tmpRouter.patch('/:id', vehicleController.patchVehicle);

export const router = tmpRouter;
