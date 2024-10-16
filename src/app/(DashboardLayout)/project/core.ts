import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';
import { CurrencyTypeDto, PropertyTypeDto } from '@/common/dto';

export interface ProjectFormInput {
  name: string;
  description: string;
  type: keyof typeof PropertyTypeDto;
  currency_type: keyof typeof CurrencyTypeDto;
  levels_qty?: string;
  country_code: string;
  state: string;
  status: string;
  city: string;
  sector: string;
  address: string;

  latitude: number;
  longitude: number;

  cover: string;

  property_feature_ids: number[];
}

export const projectDefaultValues = {
  name: '',
  description: '',
  type: PropertyTypeDto.house,
  currency_type: CurrencyTypeDto.US,
  levels_qty: undefined,
  country_code: '',
  state: '',
  city: '',
  sector: '',
  address: '',
  latitude: 0,
  longitude: 0,
  cover: undefined,
  property_feature_ids: [],
};

export const createProjectValidationSchema = yup.object({
  name: yup.string().required(ErrorMsg.required),
  description: yup.string().required(ErrorMsg.required),
  type: yup.string().required(ErrorMsg.required),
  currency_type: yup.string().required(ErrorMsg.required),
  levels_qty: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  country_code: yup.string().required(ErrorMsg.required),
  state: yup.string().required(ErrorMsg.required),
  city: yup.string().required(ErrorMsg.required),
  sector: yup.string().required(ErrorMsg.required),
  address: yup.string().required(ErrorMsg.required),
  latitude: yup.number(),
  longitude: yup.number(),
});

export const updateProjectValidationSchema = yup.object({
  name: yup.string().required(ErrorMsg.required),
  description: yup.string().required(ErrorMsg.required),
  type: yup.string().required(ErrorMsg.required),
  currency_type: yup.string().required(ErrorMsg.required),
  levels_qty: yup.string().when('type', ([type], schema) => {
    return type === 'plot'
      ? schema.notRequired()
      : schema.required(ErrorMsg.required);
  }),
  country_code: yup.string().required(ErrorMsg.required),
  state: yup.string().required(ErrorMsg.required),
  city: yup.string().required(ErrorMsg.required),
  sector: yup.string().required(ErrorMsg.required),
  address: yup.string().required(ErrorMsg.required),
  latitude: yup.number(),
  longitude: yup.number(),
});
