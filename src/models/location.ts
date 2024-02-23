import { model, Schema, Model, Document } from 'mongoose';
import { Address } from './address.js';

export interface LocationDto extends Address, Document {
  name: string;
  description: string;
}

const LocationSchema: Schema<LocationDto> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

export const Location: Model<LocationDto> = model('Location', LocationSchema);
