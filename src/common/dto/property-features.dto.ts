export enum PropertyFeaturesTypeDto {
  house = 'house',
  apartment = 'apartment',
  plot = 'plot',
  commercial = 'commercial',
  all = 'all',
}

export interface GetPropertyFeaturesDto {
  property_feature_id: number;
  description: string;
  type: keyof typeof PropertyFeaturesTypeDto;
  is_active: boolean;
}

export interface CreateUpdatePropertyFeaturesDto {
  property_feature_id?: number;
  description: string;
  type: keyof typeof PropertyFeaturesTypeDto;
  is_active?: boolean;
}
