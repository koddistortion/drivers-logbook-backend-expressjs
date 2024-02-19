import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import { DriverDto } from "../models/driver";
import { ValidationFailedError } from "../errors/400/validationFailedError";

import { DriverService } from "../services/driverService";

const getDrivers = asyncHandler(async (_req, res) => {
  await DriverService.getAllDrivers().then((drivers) => {
    return res.status(200).json(drivers);
  });
});

const getDriver = asyncHandler(async (req, res) => {
  const driverId = req.params.id;
  await DriverService.getDriver(driverId).then((driver) => {
    return res.status(200).json(driver);
  });
});

const postDriver = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new ValidationFailedError(result.array(), req.body);
  }
  await DriverService.saveDriver(req.body).then((driver) => {
    return res.status(201).json(driver);
  });
});

const deleteDriver = asyncHandler(async (req, res) => {
  const driverId = req.params.id;
  await DriverService.deleteDriver(driverId).then((driver) => {
    return res.status(200).json(driver);
  });
});

const patchDriver = asyncHandler(async (req, res) => {
  const driverId = req.params.id;
  const driverData: DriverDto = req.body;
  await DriverService.patchDriver(driverId, driverData).then((driver) => {
    res.status(200).json(driver);
  });
});

export default {
  getDrivers,
  postDriver,
  getDriver,
  deleteDriver,
  patchDriver,
};
