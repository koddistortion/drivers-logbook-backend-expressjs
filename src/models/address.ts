export interface Address {
  addressLine1: string;
  addressLine2: string;
  country: string;
  zipCode: string;
  city: string;
}

export const AddressSchemaType = {
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
    required: false,
  },
};
