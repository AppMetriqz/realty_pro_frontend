import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';
import { PropertyTypeDto } from '@/common/dto';

export interface UnitFormInput {
  project_id: string;
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
  currency_type?: string;
  price: string;
  status: string;

  cover?: File;

  property_feature_ids: number[];
}
export interface MultipleUnitFormInput {
  condition: string;
  price_per_meter?: string; // si no es plot enviar price
  price?: string;
  status: string;
  unit_ids: string; //'1,2,3';
  type: string;
}

export const multipleUnitDefaultValues: MultipleUnitFormInput = {
  condition: '',
  price_per_meter: '',
  price: '',
  status: '',
  unit_ids: '',
  type: '',
};

export const unitDefaultValues: UnitFormInput = {
  project_id: '',
  name: '',
  description: '',
  type: 'house',
  condition: '',
  levels_qty: undefined,
  level: undefined,
  meters_of_land: '',
  meters_of_building: undefined,
  price_per_meter: undefined,
  rooms: undefined,
  bathrooms: undefined,
  price: '',
  status: '',
  cover: undefined,
  property_feature_ids: [],
};

export const createUnitValidationSchema = yup.object({
  name: yup.string().required(ErrorMsg.required),
  description: yup.string().required(ErrorMsg.required),
  type: yup.string().required(ErrorMsg.required),
  condition: yup.string().required(ErrorMsg.required),
  levels_qty: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  level: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  price_per_meter: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.required(ErrorMsg.required)
      : schema.notRequired();
  }),
  meters_of_land: yup.string().required(ErrorMsg.required),
  meters_of_building: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  rooms: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  bathrooms: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  price: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  status: yup.string().required(ErrorMsg.required),
  cover: yup.mixed().required(ErrorMsg.file),
  property_feature_ids: yup
    .array()
    .min(1, ErrorMsg.arrayMin)
    .required(ErrorMsg.required),
});

export const updateUnitValidationSchema = yup.object({
  name: yup.string().required(ErrorMsg.required),
  description: yup.string().required(ErrorMsg.required),
  type: yup.string().required(ErrorMsg.required),
  condition: yup.string().required(ErrorMsg.required),
  levels_qty: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  level: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  price_per_meter: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.required(ErrorMsg.required)
      : schema.notRequired();
  }),
  meters_of_land: yup.string().required(ErrorMsg.required),
  meters_of_building: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  rooms: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  bathrooms: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  price: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  status: yup.string().required(ErrorMsg.required),
  property_feature_ids: yup
    .array()
    .min(1, ErrorMsg.arrayMin)
    .required(ErrorMsg.required),
});

export const updateMultipleUnitValidationSchema = yup.object({
  condition: yup.string().required(ErrorMsg.required),
  price_per_meter: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.required(ErrorMsg.required)
      : schema.notRequired();
  }),
  price: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  status: yup.string().required(ErrorMsg.required),
});
