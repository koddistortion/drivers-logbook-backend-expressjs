import { model, Document, Model, Schema } from 'mongoose';
import { Address, AddressSchemaType } from './address.js';

export interface CarWashDto extends Address, Document {
  name: string;
}

const CarWashSchema: Schema<CarWashDto> = new Schema<CarWashDto>({
  name: {
    type: String,
    required: true,
  },
  ...AddressSchemaType,
});

export const CarWash: Model<CarWashDto> = model('CarWash', CarWashSchema);
