import { Document } from "mongoose";
import { ObjectId } from "mongodb";

import { Driver, DriverDto } from "../models/driver";
import { NotFoundError } from "../errors/400/notFoundError";
import { Vehicle } from "../models/vehicle";

const getAllDrivers = () => {
  return Driver.find({}).exec();
};

const getDriver = async (
  id: string,
): Promise<Document & DriverDto & { _id: ObjectId }> => {
  const driver = await Driver.findById(id);
  if (driver == null) {
    return Promise.reject(new NotFoundError(`Driver with id ${id} not found!`));
  }
  return Promise.resolve(driver);
};

const saveDriver = (
  body: DriverDto,
): Promise<Document & DriverDto & { _id: ObjectId }> => {
  const driver = new Driver();
  driver.firstName = body.firstName;
  driver.lastName = body.lastName;
  return driver.save();
};

const deleteDriver = async (
  id: string,
): Promise<Document & DriverDto & { _id: ObjectId }> => {
  const driver = await Driver.findByIdAndDelete(id);
  if (driver == null) {
    return Promise.reject(new NotFoundError(`Driver with id ${id} not found!`));
  }
  const done = await Vehicle.updateMany(
    { favoriteDriver: driver },
    { favoriteDriver: null },
  );
  if (done.acknowledged) {
    console.log(
      `Cleared the favorite driver with id ${id} from ${done.modifiedCount} vehicle(s).`,
    );
  } else {
    console.warn(`Did not update vehicles with favorite drivers of ${id}!`);
  }
  return Promise.resolve(driver);
};

const patchDriver = async (
  id: string,
  updateData: DriverDto,
): Promise<Document & DriverDto & { _id: ObjectId }> => {
  const driver = await Driver.findByIdAndUpdate(id, updateData, { new: true });
  if (driver == null) {
    return Promise.reject(new NotFoundError(`Driver with id ${id} not found!`));
  }
  return Promise.resolve(driver);
};

export const DriverService = {
  getAllDrivers,
  getDriver,
  saveDriver,
  patchDriver,
  deleteDriver,
};
