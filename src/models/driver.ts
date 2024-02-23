import { model, Schema, Model, Document } from 'mongoose';

export interface DriverDto extends Document {
  firstName: string;
  lastName: string;
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

export const Driver: Model<DriverDto> = model('Driver', DriverSchema);
