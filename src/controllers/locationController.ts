import { NextFunction, Request, Response } from 'express';
import { LocationService } from '../services/locationService.js';
import { Pagination, PaginationDetails } from '../util/pagination.js';
import { LocationDto } from '../models/location.js';

const getLocations = (req: Request, res: Response, next: NextFunction) => {
  LocationService.getAllLocationsCount()
    .then((locationsCount) => {
      const paging: PaginationDetails = Pagination.extract(req, locationsCount);
      Pagination.addHeaderLinks(req, res, paging);
      LocationService.getAllLocations(paging).then(
        (locations: LocationDto[]) => {
          return res.status(200).json(locations);
        },
      );
    })
    .catch((err: Error) => next(err));
};

const getLocation = (req: Request, res: Response, next: NextFunction) => {
  const locationId = req.params['id'] ?? '';
  LocationService.getLocation(locationId)
    .then((location) => {
      return res.status(200).json(location);
    })
    .catch((err) => next(err));
};

const postLocation = (req: Request, res: Response, next: NextFunction) => {
  LocationService.saveLocation(req.body)
    .then((location) => {
      res.status(201).json(location);
    })
    .catch((err) => next(err));
};

const deleteLocation = (req: Request, res: Response, next: NextFunction) => {
  const locationId = req.params['id'] ?? '';
  LocationService.deleteLocation(locationId)
    .then((location) => {
      return res.status(200).json(location);
    })
    .catch((err: Error) => next(err));
};

const patchLocation = (req: Request, res: Response, next: NextFunction) => {
  const locationId = req.params['id'] ?? '';
  const locationData: LocationDto = req.body;
  LocationService.updateLocation(locationId, locationData)
    .then((location) => {
      return res.status(200).json(location);
    })
    .catch((err: Error) => next(err));
};

const putLocation = patchLocation;

export default {
  getLocations,
  getLocation,
  postLocation,
  putLocation,
  patchLocation,
  deleteLocation,
};
