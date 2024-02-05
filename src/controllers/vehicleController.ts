import asyncHandler from "express-async-handler";

import {Vehicle} from "../models/vehicle";

const getAllVehicles = asyncHandler(async (req, res, next) => {
    const vehicles = await Vehicle.find({}).exec();
    res.json(vehicles);
});

const createVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = new Vehicle();
    vehicle.name = req.body.name;
    await vehicle.save();
    res.status(201).json(vehicle);
});

const getVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle == null) {
        const err = new Error("Vehicle not found");
        return next(err);
    }
    res.json(vehicle);
});

export default {
    getAllVehicles,
    createVehicle,
    getVehicle
}

