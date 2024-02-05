import express from "express";

const router = express.Router();

import vehicleController from "../controllers/vehicleController";

router.get('/', vehicleController.getAllVehicles);
router.post('/', vehicleController.createVehicle);
router.get('/:id', vehicleController.getVehicle);

export default router;
