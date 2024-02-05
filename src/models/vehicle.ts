import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    name: String
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
