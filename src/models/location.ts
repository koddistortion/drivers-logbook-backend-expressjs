import { model, Schema, Model, Document } from 'mongoose';

export interface LocationDto extends Document {
  name: string;
  description: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  zipCode: string;
  city: string;

  fill(dto: LocationDto): void;
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

LocationSchema.methods['fill'] = function (dto: LocationDto) {
  this['name'] = dto.name;
  this['description'] = dto.description;
  this['addressLine1'] = dto.addressLine1;
  this['addressLine2'] = dto.addressLine2;
  this['zipCode'] = dto.zipCode;
  this['country'] = dto.country;
  this['city'] = dto.city;
};

export const Location: Model<LocationDto> = model('Location', LocationSchema);
