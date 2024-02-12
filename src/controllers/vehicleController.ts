import asyncHandler from "express-async-handler";
import {validationResult} from "express-validator";
import mongoose from "mongoose";

import {IVehicle, Vehicle} from "../models/vehicle";
import {NotFoundError} from '../errors/400/notFoundError';
import {InvalidIdError} from "../errors/400/invalidIdError";
import {ValidationFailedError} from "../errors/400/validationFailedError";

const getVehicles = asyncHandler(async (_req, res) => {
    const vehicles = await Vehicle.find({}).exec();
    res.json(vehicles);
});

const getVehicle = asyncHandler(async (req, res, next) => {
    const vehicleId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        throw new InvalidIdError(vehicleId);
    }
    const vehicle = await Vehicle.findById(vehicleId);
    if (vehicle == null) {
        throw new NotFoundError("Vehicle not found");
    }
    res.json(vehicle);
});

const postVehicle = asyncHandler(async (req, res) => {
    const vehicle = new Vehicle();
    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new ValidationFailedError(result.array(), req.body);
    }
    vehicle.name = req.body.name;
    await vehicle.save();
    res.status(201).json(vehicle);
});

const deleteVehicle = asyncHandler(async(req, res) => {
    const vehicleId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        throw new InvalidIdError(vehicleId);
    }
    const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
    if (vehicle == null) {
        throw new NotFoundError("Vehicle not found");
    }
    res.status(200).json(vehicle);
})

const patchVehicle = asyncHandler(async(req, res) => {
    const vehicleId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        throw new InvalidIdError(vehicleId);
    }
    const vehicleData: IVehicle = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, vehicleData,{new: true} );
    if (vehicle == null) {
        throw new NotFoundError(`Vehicle with id '${vehicleId}' not found!`);
    }
    res.send(vehicle);
})

export default {
    getVehicles,
    postVehicle,
    getVehicle,
    deleteVehicle,
    patchVehicle,
}

