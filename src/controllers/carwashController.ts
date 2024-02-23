import { NextFunction, Request, Response } from 'express';
import { Pagination, PaginationDetails } from '../util/pagination.js';
import { NotImplementedError } from '../errors/500/notImplementedError.js';
import { GasStationDto } from '../models/gasStation.js';
import { GasStationService } from '../services/gasStationService.js';
import { CarWashService } from '../services/carWashService.js';

const getCarWashes = (req: Request, res: Response, next: NextFunction) => {
  CarWashService.getAllCarWashCount()
    .then((getCarWashesCount) => {
      const paging: PaginationDetails = Pagination.extract(
        req,
        getCarWashesCount,
      );
      Pagination.addHeaderLinks(req, res, paging);
      GasStationService.getAllGasStations(paging).then(
        (gasStations: GasStationDto[]) => {
          return res.status(200).json(gasStations);
        },
      );
    })
    .catch((err: Error) => next(err));
};

const getCarWash = (req: Request, res: Response, next: NextFunction) => {
  const carWashId = req.params['id'] ?? '';
  CarWashService.getCarWash(carWashId)
    .then((location) => {
      return res.status(200).json(location);
    })
    .catch((err) => next(err));
};

const postCarWash = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotImplementedError());
};

const putCarWash = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotImplementedError());
};

const patchCarWash = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotImplementedError());
};

const deleteCarWash = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotImplementedError());
};
export default {
  getCarWashes,
  getCarWash,
  postCarWash,
  putCarWash,
  patchCarWash,
  deleteCarWash,
};
