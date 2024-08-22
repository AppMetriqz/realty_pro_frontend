export interface ApiDto {
  isOk: boolean;
  message?: string;
  status?: number;
  data?: object;
}

export interface ApiPaginationDto {
  pageSize?: number;
  pageIndex?: number;
}

export enum SortByDto {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum PropertyTypeDto {
  house = 'house',
  apartment = 'apartment',
  plot = 'plot',
  commercial = 'commercial',
}

export enum CurrencyTypeDto {
  US = 'US',
  RD = 'RD',
}
