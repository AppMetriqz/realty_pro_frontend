import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';
import {CreateUpdatePropertyFeaturesDto} from '@/common/dto';

export const propertyFeatureValidationSchema = yup.object({
  description: yup.string().required(ErrorMsg.required),
  type: yup.string().required(ErrorMsg.required),
});

export const propertyFeatureFormDefaultValues: CreateUpdatePropertyFeaturesDto = {
  description: '',
  type: 'all',
};
