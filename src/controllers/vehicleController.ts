import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import { VehicleDto, Vehicle } from "../models/vehicle";
import { NotFoundError } from "../errors/400/notFoundError";
import { ValidationFailedError } from "../errors/400/validationFailedError";

const getVehicles = asyncHandler(async (_req, res) => {
  const vehicles = await Vehicle.find({}).exec();
  res.json(vehicles);
});

const getVehicle = asyncHandler((req, res, next) => {
  const vehicleId = req.params.id;
  Vehicle.findById(vehicleId)
    .then((vehicle) => {
      if (vehicle == null) {
        throw new NotFoundError("Vehicle not found");
      }
      return res.json(vehicle);
    })
    .catch((err) => {
      next(err);
    });
});

const postVehicle = asyncHandler((req, res, next) => {
  const vehicle = new Vehicle();
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new ValidationFailedError(result.array(), req.body);
  }
  vehicle.name = req.body.name;
  vehicle.brand = req.body.brand;
  vehicle
    .save()
    .then((_ignore) => {
      return res.status(201).json(vehicle);
    })
    .catch((err) => {
      next(err);
    });
});

const deleteVehicle = asyncHandler((req, res, next) => {
  const vehicleId = req.params.id;
  Vehicle.findByIdAndDelete(vehicleId)
    .then((vehicle) => {
      if (vehicle == null) {
        throw new NotFoundError("Vehicle not found");
      }
      return res.status(200).json(vehicle);
    })
    .catch((err) => {
      next(err);
    });
});

const patchVehicle = asyncHandler(async (req, res, next) => {
  const vehicleId = req.params.id;
  const vehicleData: VehicleDto = req.body;
  await Vehicle.findByIdAndUpdate(vehicleId, vehicleData, { new: true })
    .then((vehicle) => {
      if (vehicle == null) {
        throw new NotFoundError(`Vehicle with id '${vehicleId}' not found!`);
      }
      return res.send(vehicle);
    })
    .catch((err) => {
      next(err);
    });
});

export default {
  getVehicles,
  postVehicle,
  getVehicle,
  deleteVehicle,
  patchVehicle,
};
