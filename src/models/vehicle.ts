import { model, Schema, Model, Document } from "mongoose";

export interface IVehicle extends Document {
  name: string;
}

const VehicleSchema: Schema<IVehicle> = new Schema({
  name: { type: String, required: true },
});

export const Vehicle: Model<IVehicle> = model("Vehicle", VehicleSchema);
