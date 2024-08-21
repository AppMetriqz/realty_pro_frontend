export interface ProjectDto {
  project_id?: number;
  name: string;
  description: string;
  type: string;
  currency_type: string;
  levels_qty?: string;
  country_code: string;
  state: string;
  city: string;
  sector: string;
  address: string;
  latitude: number;
  longitude: number;
  cover_path: string;
  unit_from_price?: string;
  unit_to_price?: string;
  cover: File;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  create_by?: number;
  update_by?: number;
  property_feature_ids: string;
}

export interface ProjectSummaryDto {
  name: string;
  description: string;
  unit_from_price: string;
  unit_to_price: string;
  city: string;
  sector: string;
  cover_path: string;
  address: string;
  type: string;
  currency_type: string;
  country_code: string;
  total_unit: number;
  total_available_unit: number;
  total_sold_unit: number;
  total_reserved_unit: number;
  unit_meters_from: number;
  unit_meters_to: number;
  currency: string;
  property_features: { property_feature_id: 1; description: 'string' }[];
}
