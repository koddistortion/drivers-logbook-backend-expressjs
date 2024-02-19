import {model, Schema, Model, Document, Types} from 'mongoose';
import {DriverDto} from "./driver";

export interface VehicleDto extends Document {
    name: String,
    brand: String,
    favoriteDriver: Types.ObjectId | DriverDto,
}

const VehicleSchema: Schema<VehicleDto> = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    favoriteDriver: {
        type: Types.ObjectId,
        ref: 'Driver',
        required: false
    }
});

VehicleSchema.methods.fromDto = function (dto: VehicleDto) {
    this.name = dto.name;
    this.brand = dto.brand
}

export const Vehicle: Model<VehicleDto> = model('Vehicle', VehicleSchema);
