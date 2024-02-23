import { NextFunction, Request, Response } from 'express';
import { Pagination, PaginationDetails } from '../util/pagination.js';
import { GasStationDto } from '../models/gasStation.js';
import { WorkshopService } from '../services/workshopService.js';
import { LocationDto } from '../models/location.js';

const getWorkshops = (req: Request, res: Response, next: NextFunction) => {
  WorkshopService.getAllWorkshopsCount()
    .then((workshopsCount) => {
      const paging: PaginationDetails = Pagination.extract(req, workshopsCount);
      Pagination.addHeaderLinks(req, res, paging);
      WorkshopService.getAllWorkshops(paging).then(
        (gasStations: GasStationDto[]) => {
          return res.status(200).json(gasStations);
        },
      );
    })
    .catch((err: Error) => next(err));
};

const getWorkshop = (req: Request, res: Response, next: NextFunction) => {
  const getWorkshopId = req.params['id'] ?? '';
  WorkshopService.getWorkshop(getWorkshopId)
    .then((workshop) => {
      return res.status(200).json(workshop);
    })
    .catch((err) => next(err));
};

const postWorkshop = (req: Request, res: Response, next: NextFunction) => {
  WorkshopService.saveWorkshop(req.body)
    .then((workshop) => {
      res.status(201).json(workshop);
    })
    .catch((err) => next(err));
};

const deleteWorkshop = (req: Request, res: Response, next: NextFunction) => {
  const workshopId = req.params['id'] ?? '';
  WorkshopService.deleteWorkshop(workshopId)
    .then((workshop) => {
      return res.status(200).json(workshop);
    })
    .catch((err: Error) => next(err));
};

const patchWorkshop = (req: Request, res: Response, next: NextFunction) => {
  const workshopId = req.params['id'] ?? '';
  const workshopData: LocationDto = req.body;
  WorkshopService.updateWorkshop(workshopId, workshopData)
    .then((workshop) => {
      return res.status(200).json(workshop);
    })
    .catch((err: Error) => next(err));
};

const putWorkshop = postWorkshop;

export default {
  getWorkshops,
  getWorkshop,
  postWorkshop,
  putWorkshop,
  patchWorkshop,
  deleteWorkshop,
};
