import { model, Document, Model, Schema } from 'mongoose';
import { Address, AddressSchemaType } from './address.js';

export interface GasStationDto extends Address, Document {
  name: string;
}

const GasStationSchema: Schema<GasStationDto> = new Schema<GasStationDto>({
  name: {
    type: String,
    required: true,
  },
  ...AddressSchemaType,
});

export const GasStation: Model<GasStationDto> = model(
  'GasStation',
  GasStationSchema,
);
