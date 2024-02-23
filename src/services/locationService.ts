import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import {
  Entity,
  EntityNotFoundError,
} from '../errors/400/entityNotFoundError.js';
import { LocationDto, Location } from '../models/location.js';
import { PaginationDetails } from '../util/pagination.js';

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
  const location = await Location.findById(id);
  if (location == null) {
    return Promise.reject(new EntityNotFoundError(Entity.Location, id));
  }
  return Promise.resolve(location);
};

const saveLocation = (
  body: LocationDto,
): Promise<Document & LocationDto & { _id: ObjectId }> => {
  const location = new Location(body);
  return location.save();
};

const deleteLocation = async (
  id: string,
): Promise<Document & LocationDto & { _id: ObjectId }> => {
  const location = await Location.findByIdAndDelete(id);
  if (location == null) {
    return Promise.reject(new EntityNotFoundError(Entity.Location, id));
  }
  return Promise.resolve(location);
};

const updateLocation = async (
  id: string,
  updateData: LocationDto,
): Promise<Document & LocationDto & { _id: ObjectId }> => {
  const location = await Location.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (location == null) {
    return Promise.reject(new EntityNotFoundError(Entity.Location, id));
  }
  return Promise.resolve(location);
};
export const LocationService = {
  getAllLocationsCount,
  getAllLocations,
  getLocation,
  saveLocation,
  deleteLocation,
  updateLocation,
};
