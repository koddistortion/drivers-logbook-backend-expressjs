import { Document } from "mongoose";
import { ObjectId } from "mongodb";
import {
  Entity,
  EntityNotFoundError,
} from "../errors/400/entityNotFoundError.js";
import { LocationDto, Location } from "../models/location.js";
import { PaginationDetails } from "../util/pagination.js";

const getAllLocationsCount = () => {
  return Location.find().countDocuments().exec();
};

const getAllLocations = (paging: PaginationDetails) => {
  return Location.find({})
    .skip(paging.itemsToSkip)
    .limit(paging.itemsPerPage)
    .exec();
};

const getLocation = async (
  id: string,
): Promise<Document & LocationDto & { _id: ObjectId }> => {
  const driver = await Location.findById(id);
  if (driver == null) {
    return Promise.reject(new EntityNotFoundError(Entity.Location, id));
  }
  return Promise.resolve(driver);
};

export const LocationService = {
  getAllLocationsCount,
  getAllLocations,
  getLocation,
};
