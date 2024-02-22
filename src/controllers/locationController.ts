import { NextFunction, Request, Response } from "express";
import { LocationService } from "../services/locationService.js";
import { Pagination, PaginationDetails } from "../util/pagination.js";
import { LocationDto } from "../models/location.js";
import { NotImplementedError } from "../errors/500/notImplementedError.js";

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
  const locationId = req.params["id"] ?? "";
  LocationService.getLocation(locationId)
    .then((location) => {
      return res.status(200).json(location);
    })
    .catch((err) => next(err));
};

const postLocation = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotImplementedError());
};

const putLocation = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotImplementedError());
};

const patchLocation = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotImplementedError());
};

const deleteLocation = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotImplementedError());
};
export default {
  getLocations,
  getLocation,
  postLocation,
  putLocation,
  patchLocation,
  deleteLocation,
};
