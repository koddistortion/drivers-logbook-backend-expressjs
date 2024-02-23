import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

import { PaginationDetails } from '../util/pagination.js';
import {
  Entity,
  EntityNotFoundError,
} from '../errors/400/entityNotFoundError.js';
import { Workshop, WorkshopDto } from '../models/workshop.js';

const getAllWorkshopsCount = () => {
  return Workshop.find().countDocuments().exec();
};

const getAllWorkshops = (paging: PaginationDetails) => {
  return Workshop.find({})
    .skip(paging.itemsToSkip)
    .limit(paging.itemsPerPage)
    .exec();
};

const getWorkshop = async (
  id: string,
): Promise<Document & WorkshopDto & { _id: ObjectId }> => {
  const workshop = await Workshop.findById(id);
  if (workshop == null) {
    return Promise.reject(new EntityNotFoundError(Entity.Workshop, id));
  }
  return Promise.resolve(workshop);
};

const saveWorkshop = (
  body: WorkshopDto,
): Promise<Document & WorkshopDto & { _id: ObjectId }> => {
  const workshop = new Workshop(body);
  return workshop.save();
};

const deleteWorkshop = async (
  id: string,
): Promise<Document & WorkshopDto & { _id: ObjectId }> => {
  const workshop = await Workshop.findByIdAndDelete(id);
  if (workshop == null) {
    return Promise.reject(new EntityNotFoundError(Entity.Workshop, id));
  }
  return Promise.resolve(workshop);
};

const updateWorkshop = async (
  id: string,
  updateData: WorkshopDto,
): Promise<Document & WorkshopDto & { _id: ObjectId }> => {
  const workshop = await Workshop.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (workshop == null) {
    return Promise.reject(new EntityNotFoundError(Entity.Workshop, id));
  }
  return Promise.resolve(workshop);
};

export const WorkshopService = {
  getAllWorkshopsCount,
  getAllWorkshops,
  getWorkshop,
  saveWorkshop,
  updateWorkshop,
  deleteWorkshop,
};
