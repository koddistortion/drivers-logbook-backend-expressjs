import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import { VehicleDto } from "../models/vehicle";
import { ValidationFailedError } from "../errors/400/validationFailedError";
import { VehicleService } from "../services/vehicleService";

const getVehicles = asyncHandler(async (_req, res) => {
  await VehicleService.getAllVehicles().then((vehicles) => {
    return res.status(200).json(vehicles);
  });
});

const getVehicle = asyncHandler(async (req, res) => {
  const vehicleId = req.params.id;
  await VehicleService.getVehicle(vehicleId).then((vehicles) => {
    return res.status(200).json(vehicles);
  });
});

const postVehicle = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new ValidationFailedError(result.array(), req.body);
  }
  await VehicleService.saveVehicle(req.body).then((vehicle) => {
    return res.status(201).json(vehicle);
  });
});

const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicleId = req.params.id;
  await VehicleService.deleteVehicle(vehicleId).then((driver) => {
    return res.status(200).json(driver);
  });
});

const patchVehicle = asyncHandler(async (req, res) => {
  const vehicleId = req.params.id;
  const vehicleData: VehicleDto = req.body;
  await VehicleService.updateVehicle(vehicleId, vehicleData).then((driver) => {
    res.status(200).json(driver);
  });
});

export default {
  getVehicles,
  postVehicle,
  getVehicle,
  deleteVehicle,
  patchVehicle,
};
