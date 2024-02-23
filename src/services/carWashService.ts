import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import {
  Entity,
  EntityNotFoundError,
} from '../errors/400/entityNotFoundError.js';
import { PaginationDetails } from '../util/pagination.js';
import { CarWash, CarWashDto } from '../models/carwash.js';

const getAllCarWashCount = () => {
  return CarWash.find().countDocuments().exec();
};

const getAllCarWash = (paging: PaginationDetails) => {
  return CarWash.find({})
    .skip(paging.itemsToSkip)
    .limit(paging.itemsPerPage)
    .exec();
};

const getCarWash = async (
  id: string,
): Promise<Document & CarWashDto & { _id: ObjectId }> => {
  const carWash = await CarWash.findById(id);
  if (carWash == null) {
    return Promise.reject(new EntityNotFoundError(Entity.GasStation, id));
  }
  return Promise.resolve(carWash);
};

const saveCarWash = (
  body: CarWashDto,
): Promise<Document & CarWashDto & { _id: ObjectId }> => {
  const carWash = new CarWash(body);
  return carWash.save();
};

const deleteCarWash = async (
  id: string,
): Promise<Document & CarWashDto & { _id: ObjectId }> => {
  const carWash = await CarWash.findByIdAndDelete(id);
  if (carWash == null) {
    return Promise.reject(new EntityNotFoundError(Entity.CarWash, id));
  }
  return Promise.resolve(carWash);
};

const updateCarWash = async (
  id: string,
  updateData: CarWashDto,
): Promise<Document & CarWashDto & { _id: ObjectId }> => {
  const carWash = await CarWash.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (carWash == null) {
    return Promise.reject(new EntityNotFoundError(Entity.CarWash, id));
  }
  return Promise.resolve(carWash);
};
export const CarWashService = {
  getAllCarWashCount,
  getAllCarWash,
  getCarWash,
  saveCarWash,
  deleteCarWash,
  updateCarWash,
};
