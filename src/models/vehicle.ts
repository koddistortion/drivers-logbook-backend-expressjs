import { model, Schema, Model, Document, Types } from 'mongoose';
import { DriverDto } from './driver.js';

export interface VehicleDto extends Document {
  name: string;
  modelName: string;
  brand: string;
  vin: string;
  licensePlate: string;
  initialMileage: number;
  purchaseDate: Date;
  dateOfPurchase: Date;
  favoriteDriver: Types.ObjectId | DriverDto;
}

const VehicleSchema: Schema<VehicleDto> = new Schema({
  name: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  vin: {
    type: String,
    required: false,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  initialMileage: {
    type: Number,
    required: false,
    default: 0,
  },
  purchaseDate: {
    type: Date,
    required: false,
  },
  dateOfPurchase: {
    type: Date,
    required: false,
  },
  favoriteDriver: {
    type: Types.ObjectId,
    ref: 'Driver',
    required: false,
  },
});

export const Vehicle: Model<VehicleDto> = model('Vehicle', VehicleSchema);
