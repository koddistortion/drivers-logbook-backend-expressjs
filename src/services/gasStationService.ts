import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import {
  Entity,
  EntityNotFoundError,
} from '../errors/400/entityNotFoundError.js';
import { PaginationDetails } from '../util/pagination.js';
import { GasStation, GasStationDto } from '../models/gasStation.js';

const getAllGasStationsCount = () => {
  return GasStation.find().countDocuments().exec();
};

const getAllGasStations = (paging: PaginationDetails) => {
  return GasStation.find({})
    .skip(paging.itemsToSkip)
    .limit(paging.itemsPerPage)
    .exec();
};

const getGasStation = async (
  id: string,
): Promise<Document & GasStationDto & { _id: ObjectId }> => {
  const gasStation = await GasStation.findById(id);
  if (gasStation == null) {
    return Promise.reject(new EntityNotFoundError(Entity.GasStation, id));
  }
  return Promise.resolve(gasStation);
};

const saveGasStation = (
  body: GasStationDto,
): Promise<Document & GasStationDto & { _id: ObjectId }> => {
  const gasStation = new GasStation(body);
  return gasStation.save();
};

const deleteGasStation = async (
  id: string,
): Promise<Document & GasStationDto & { _id: ObjectId }> => {
  const gasStation = await GasStation.findByIdAndDelete(id);
  if (gasStation == null) {
    return Promise.reject(new EntityNotFoundError(Entity.GasStation, id));
  }
  return Promise.resolve(gasStation);
};

const updateGasStation = async (
  id: string,
  updateData: GasStationDto,
): Promise<Document & GasStationDto & { _id: ObjectId }> => {
  const gasStation = await GasStation.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (gasStation == null) {
    return Promise.reject(new EntityNotFoundError(Entity.GasStation, id));
  }
  return Promise.resolve(gasStation);
};
export const GasStationService = {
  getAllGasStationsCount,
  getAllGasStations,
  getGasStation,
  saveGasStation,
  deleteGasStation,
  updateGasStation,
};
