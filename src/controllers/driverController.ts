import { DriverDto } from '../models/driver.js';

import { DriverService } from '../services/driverService.js';
import { NextFunction, Request, Response } from 'express';
import {
  Entity,
  EntityNotFoundError,
} from '../errors/400/entityNotFoundError.js';

const getDrivers = (_req: Request, res: Response, next: NextFunction) => {
  DriverService.getAllDrivers()
    .then((drivers: DriverDto[]) => {
      return res.status(200).json(drivers);
    })
    .catch((err: Error) => next(err));
};

const getDriver = (req: Request, res: Response, next: NextFunction) => {
  const driverId = req.params['id'] ?? '';
  DriverService.getDriver(driverId)
    .then((driver) => {
      if (driver == null) {
        return next(new EntityNotFoundError(Entity.Driver, driverId));
      }
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
  const driverId = req.params['id'] ?? '';
  DriverService.deleteDriver(driverId)
    .then((driver) => {
      if (driver == null) {
        return next(new EntityNotFoundError(Entity.Driver, driverId));
      }
      return res.status(200).json(driver);
    })
    .catch((err) => next(err));
};

const patchDriver = (req: Request, res: Response, next: NextFunction) => {
  const driverId = req.params['id'] ?? '';
  const driverData: DriverDto = req.body;
  DriverService.updateDriver(driverId, driverData)
    .then((driver) => {
      if (driver == null) {
        return next(new EntityNotFoundError(Entity.Driver, driverId));
      }
      res.status(200).json(driver);
    })
    .catch((err) => next(err));
};

export default {
  getDrivers,
  postDriver,
  getDriver,
  deleteDriver,
  patchDriver,
};
