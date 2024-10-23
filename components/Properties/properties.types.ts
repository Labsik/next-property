export type PropertyType = {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: PropertyLocation;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: PropertyRates;
  seller_info: PropertySeller;
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PropertyLocation = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};

export type PropertyRates = {
  weekly?: number;
  monthly?: number;
  nightly?: number;
};

export type PropertySeller = {
  name: string;
  email: string;
  phone: string;
};

export type PropertyCardProps = {
  property: PropertyType;
};
