import { model, Schema, Model, Document, Types } from 'mongoose';
import { DriverDto } from './driver.js';

export interface VehicleDto extends Document {
  name: string;
  brand: string;
  vin: string;
  licensePlate: string;
  initialMileage: number;
  purchaseDate: Date;
  dateOfPurchase: Date;
  favoriteDriver: Types.ObjectId | DriverDto;

  fill(dto: VehicleDto): void;
}

const VehicleSchema: Schema<VehicleDto> = new Schema({
  name: {
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

VehicleSchema.methods['fill'] = function (dto: VehicleDto) {
  this['name'] = dto.name;
  this['brand'] = dto.brand;
  this['licensePlate'] = dto.licensePlate;
  this['initialMileage'] = dto.initialMileage;
  this['dateOfPurchase'] = dto.dateOfPurchase;
  this['registrationDate'] = dto.purchaseDate;
  this['favoriteDriver'] = dto.favoriteDriver;
};

export const Vehicle: Model<VehicleDto> = model('Vehicle', VehicleSchema);
