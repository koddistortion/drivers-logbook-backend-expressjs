import { NextFunction, Request, Response } from 'express';
import { Pagination, PaginationDetails } from '../util/pagination.js';
import { GasStationDto } from '../models/gasStation.js';
import { GasStationService } from '../services/gasStationService.js';
import { LocationDto } from '../models/location.js';

const getGasStations = (req: Request, res: Response, next: NextFunction) => {
  GasStationService.getAllGasStationsCount()
    .then((gasStationsCount) => {
      const paging: PaginationDetails = Pagination.extract(
        req,
        gasStationsCount,
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

const getGasStation = (req: Request, res: Response, next: NextFunction) => {
  const gasStationId = req.params['id'] ?? '';
  GasStationService.getGasStation(gasStationId)
    .then((location) => {
      return res.status(200).json(location);
    })
    .catch((err) => next(err));
};

const postGasStation = (req: Request, res: Response, next: NextFunction) => {
  GasStationService.saveGasStation(req.body)
    .then((gasStation) => {
      res.status(201).json(gasStation);
    })
    .catch((err) => next(err));
};

const deleteGasStation = (req: Request, res: Response, next: NextFunction) => {
  const gasStationId = req.params['id'] ?? '';
  GasStationService.deleteGasStation(gasStationId)
    .then((gasStation) => {
      return res.status(200).json(gasStation);
    })
    .catch((err: Error) => next(err));
};

const patchGasStation = (req: Request, res: Response, next: NextFunction) => {
  const gasStationId = req.params['id'] ?? '';
  const gasStationData: LocationDto = req.body;
  GasStationService.updateGasStation(gasStationId, gasStationData)
    .then((gasStation) => {
      return res.status(200).json(gasStation);
    })
    .catch((err: Error) => next(err));
};

const putGasStation = postGasStation;

export default {
  getGasStations,
  getGasStation,
  postGasStation,
  putGasStation,
  patchGasStation,
  deleteGasStation,
};
