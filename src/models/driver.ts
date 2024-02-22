import { model, Schema, Model, Document } from 'mongoose';

export interface DriverDto extends Document {
  firstName: string;
  lastName: string;

  fill(dto: DriverDto): void;
}

const DriverSchema: Schema<DriverDto> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

DriverSchema.methods['fill'] = function (dto: DriverDto) {
  this['firstName'] = dto.firstName;
  this['lastName'] = dto.lastName;
};

export const Driver: Model<DriverDto> = model('Driver', DriverSchema);
