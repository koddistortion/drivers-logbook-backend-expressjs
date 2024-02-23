import { NextFunction, Request, Response } from 'express';
import { Pagination, PaginationDetails } from '../util/pagination.js';
import { CarWashService } from '../services/carWashService.js';
import { CarWashDto } from '../models/carwash.js';
import { LocationDto } from '../models/location.js';

const getCarWashes = (req: Request, res: Response, next: NextFunction) => {
  CarWashService.getAllCarWashCount()
    .then((getCarWashesCount) => {
      const paging: PaginationDetails = Pagination.extract(
        req,
        getCarWashesCount,
      );
      Pagination.addHeaderLinks(req, res, paging);
      CarWashService.getAllCarWash(paging).then((carWashes: CarWashDto[]) => {
        return res.status(200).json(carWashes);
      });
    })
    .catch((err: Error) => next(err));
};

const getCarWash = (req: Request, res: Response, next: NextFunction) => {
  const carWashId = req.params['id'] ?? '';
  CarWashService.getCarWash(carWashId)
    .then((carWash) => {
      return res.status(200).json(carWash);
    })
    .catch((err) => next(err));
};

const postCarWash = (req: Request, res: Response, next: NextFunction) => {
  CarWashService.saveCarWash(req.body)
    .then((carWash) => {
      res.status(201).json(carWash);
    })
    .catch((err) => next(err));
};

const deleteCarWash = (req: Request, res: Response, next: NextFunction) => {
  const carWashId = req.params['id'] ?? '';
  CarWashService.deleteCarWash(carWashId)
    .then((carWash) => {
      return res.status(200).json(carWash);
    })
    .catch((err: Error) => next(err));
};

const patchCarWash = (req: Request, res: Response, next: NextFunction) => {
  const carWashId = req.params['id'] ?? '';
  const carWashData: LocationDto = req.body;
  CarWashService.updateCarWash(carWashId, carWashData)
    .then((carWash) => {
      return res.status(200).json(carWash);
    })
    .catch((err: Error) => next(err));
};

const putCarWash = patchCarWash;

export default {
  getCarWashes,
  getCarWash,
  postCarWash,
  putCarWash,
  patchCarWash,
  deleteCarWash,
};
