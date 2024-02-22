import { DriverDto } from "../models/driver.js";

import { DriverService } from "../services/driverService.js";
import { NextFunction, Request, Response } from "express";
import { Pagination, PaginationDetails } from "../util/pagination.js";

const getDrivers = (req: Request, res: Response, next: NextFunction) => {
  DriverService.getAllDriversCount()
    .then((driversCount) => {
      const paging: PaginationDetails = Pagination.extract(req, driversCount);
      Pagination.addHeaderLinks(req, res, paging);
      DriverService.getAllDrivers(paging).then((drivers: DriverDto[]) => {
        return res.status(200).json(drivers);
      });
    })
    .catch((err: Error) => next(err));
};

const getDriver = (req: Request, res: Response, next: NextFunction) => {
  const driverId = req.params["id"] ?? "";
  DriverService.getDriver(driverId)
    .then((driver) => {
      return res.status(200).json(driver);
    })
    .catch((err) => next(err));
};

const postDriver = (req: Request, res: Response, next: NextFunction) => {
  DriverService.saveDriver(req.body)
    .then((driver) => {
      return res.status(201).json(driver);
    })
    .catch((err) => next(err));
};

const deleteDriver = (req: Request, res: Response, next: NextFunction) => {
  const driverId = req.params["id"] ?? "";
  DriverService.deleteDriver(driverId)
    .then((driver) => {
      return res.status(200).json(driver);
    })
    .catch((err) => next(err));
};

const patchDriver = (req: Request, res: Response, next: NextFunction) => {
  const driverId = req.params["id"] ?? "";
  const driverData: DriverDto = req.body;
  DriverService.updateDriver(driverId, driverData)
    .then((driver) => {
      res.status(200).json(driver);
    })
    .catch((err) => next(err));
};

const putDriver = patchDriver;

export default {
  getDrivers,
  postDriver,
  getDriver,
  deleteDriver,
  patchDriver,
  putDriver,
};
