import { PropertyTypeDto } from './api.dto';
import { CreateContactDto } from './contact.dto';

export interface UnitDto {
  unit_id?: string | number | string[] | null;
  project_id?: string | number | string[];
  name: string;
  description: string;
  type: keyof typeof PropertyTypeDto;
  condition: string;
  levels_qty?: string;
  level?: string;
  meters_of_land: string;
  meters_of_building?: string;
  price_per_meter?: string;
  rooms?: string;
  bathrooms?: string;
  price: number;
  status: string;
  cover?: File;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  create_by?: number;
  update_by?: number;
  property_feature_ids: string;
}
export interface GetUnitDto {
  unit_id: string | number;
  project_id?: string | number | string[];
  name: string;
  description: string;
  type: keyof typeof PropertyTypeDto;
  condition: string;
  cover_path: string;
  currency_type: string;
  levels_qty?: string;
  level?: number;
  client?: CreateContactDto;
  meters_of_land: string;
  meters_of_building?: string;
  price_per_meter?: string;
  rooms?: string;
  bathrooms?: string;
  price: string;
  status: string;
  cover?: File;
  sale?: {
    sale_id?: number;
  };
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  create_by?: number;
  update_by?: number;
  property_feature_ids: number[];
  property_features: Array<{
    property_feature_id: number;
    description: string;
  }>;
  project: {
    name: string;
    state: string;
    city: string;
    sector: string;
    address: string;
    country_code: string;
  };
}

export interface MultipleUnitDto {
  project_id: string | string[];
  condition: string;
  price_per_meter?: number; // si no es plot enviar price
  price?: number;
  status: string;
  unit_ids: string; //'1,2,3';
}
