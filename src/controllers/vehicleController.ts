import { NextFunction, Request, Response } from "express";

import { VehicleDto } from "../models/vehicle.js";
import { VehicleService } from "../services/vehicleService.js";
import { Pagination, PaginationDetails } from "../util/pagination.js";

const getVehicles = (req: Request, res: Response, next: NextFunction) => {
  VehicleService.getAllVehiclesCount()
    .then((vehiclesCount) => {
      const paging: PaginationDetails = Pagination.extract(req, vehiclesCount);
      Pagination.addHeaderLinks(req, res, paging);
      VehicleService.getAllVehicles(paging).then((vehicles) => {
        return res.status(200).json(vehicles);
      });
    })
    .catch((err: Error) => next(err));
};

const getVehicle = (req: Request, res: Response, next: NextFunction) => {
  const vehicleId = req.params["id"] ?? "";
  VehicleService.getVehicle(vehicleId)
    .then((vehicle) => {
      return res.status(200).json(vehicle);
    })
    .catch((err: Error) => next(err));
};

const postVehicle = (req: Request, res: Response, next: NextFunction) => {
  VehicleService.saveVehicle(req.body)
    .then((vehicle) => {
      return res.status(201).json(vehicle);
    })
    .catch((err: Error) => next(err));
};

const deleteVehicle = (req: Request, res: Response, next: NextFunction) => {
  const vehicleId = req.params["id"] ?? "";
  VehicleService.deleteVehicle(vehicleId)
    .then((vehicle) => {
      return res.status(200).json(vehicle);
    })
    .catch((err: Error) => next(err));
};

const patchVehicle = (req: Request, res: Response, next: NextFunction) => {
  const vehicleId = req.params["id"] ?? "";
  const vehicleData: VehicleDto = req.body;
  VehicleService.updateVehicle(vehicleId, vehicleData)
    .then((vehicle) => {
      return res.status(200).json(vehicle);
    })
    .catch((err: Error) => next(err));
};

const putVehicle = patchVehicle;

export default {
  getVehicles,
  postVehicle,
  getVehicle,
  patchVehicle,
  putVehicle,
  deleteVehicle,
};
