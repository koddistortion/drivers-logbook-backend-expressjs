import { model, Document, Model, Schema } from 'mongoose';
import { Address, AddressSchemaType } from './address.js';

export interface WorkshopDto extends Address, Document {
  name: string;
}

const WorkshopSchema: Schema<WorkshopDto> = new Schema<WorkshopDto>({
  name: {
    type: String,
    required: true,
  },
  ...AddressSchemaType,
});

export const Workshop: Model<WorkshopDto> = model('Workshop', WorkshopSchema);
