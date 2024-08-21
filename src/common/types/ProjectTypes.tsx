import { CreateContactDto } from '../dto';

export type UnitStatusType = {
  value: string;
  label: string;
};

export type SaleStagesType = {
  value: string;
  label: string;
};

export type DeleteFormType = { notes: string; deleteInput: string };

export type CardPropertyType = {
  id?: string | number;
  name: string;
  imageSrc: string;
  country_code?: string;
  cover_path?: string;
  address: string;
  type: string;
  price?: string;
  currency_type?: string;
  meters?: string;
  creationDate?: string;
  total_unit?: number;
  total_available_unit?: number;
  price_per_meter?: string;
  meters_of_land?: string;
  condition?: string;
  meters_of_building?: string;
  total_reserved_unit?: number;
  client?: CreateContactDto;
  status?: string;
  level?: number;
  rooms?: string;
  bathrooms?: string;
  unit_from_price?: string;
  unit_to_price?: string;
  unit_meters_from?: number;
  unit_meters_to?: number;
  total_sold_unit?: number;
  description?: string;
  property_feature_ids?: number[];
  property_features?: {
    property_feature_id: number | string;
    description: string;
  }[];
};
