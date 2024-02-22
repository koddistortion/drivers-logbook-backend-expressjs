import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Vehicle, VehicleDto } from '../models/vehicle.js';
import { NotFoundError } from '../errors/400/notFoundError.js';
import { PaginationDetails } from '../util/pagination.js';

const getAllVehiclesCount = () => {
  return Vehicle.find().countDocuments().exec();
};

const getAllVehicles = (page: PaginationDetails) => {
  return Vehicle.find({})
    .skip(page.itemsToSkip)
    .limit(page.itemsPerPage)
    .exec();
};

const getVehicle = async (
  id: string,
): Promise<Document & VehicleDto & { _id: ObjectId }> => {
  const vehicle = await Vehicle.findById(id);
  if (vehicle == null) {
    return Promise.reject(
      new NotFoundError(`Vehicle with id ${id} not found!`),
    );
  }
  return Promise.resolve(vehicle);
};

const saveVehicle = (
  body: VehicleDto,
): Promise<Document & VehicleDto & { _id: ObjectId }> => {
  const vehicle = new Vehicle();
  vehicle.fill(body);
  return vehicle.save();
};

const deleteVehicle = async (
  id: string,
): Promise<Document & VehicleDto & { _id: ObjectId }> => {
  const vehicle = await Vehicle.findByIdAndDelete(id);
  if (vehicle == null) {
    return Promise.reject(
      new NotFoundError(`Vehicle with id ${id} not found!`),
    );
  }
  return Promise.resolve(vehicle);
};

const updateVehicle = async (
  id: string,
  updateData: VehicleDto,
): Promise<Document & VehicleDto & { _id: ObjectId }> => {
  const vehicle = await Vehicle.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (vehicle == null) {
    return Promise.reject(
      new NotFoundError(`Vehicle with id ${id} not found!`),
    );
  }
  return Promise.resolve(vehicle);
};

export const VehicleService = {
  getAllVehiclesCount,
  getAllVehicles,
  getVehicle,
  saveVehicle,
  updateVehicle,
  deleteVehicle,
};
