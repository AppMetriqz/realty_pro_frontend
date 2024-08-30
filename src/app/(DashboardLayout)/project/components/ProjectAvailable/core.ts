import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';

export const deleteValidationSchema = yup.object({
  deleteInput: yup
    .string()
    .matches(/\bBORRAR UNIDAD\b/, ErrorMsg.match)
    .required(ErrorMsg.required),
  notes: yup.string().required(ErrorMsg.required),
});
export const cancelSaleValidationSchema = yup.object({
  notes: yup.string().required(ErrorMsg.required),
});

export const cancelSaleFormDefaultValues = {
  notes: '',
};

export const deleteFormDefaultValues = {
  deleteInput: '',
  notes: '',
};

export const sellValidationSchema = yup.object({
  client_id: yup.string().required(ErrorMsg.required),
  seller_id: yup.string().required(ErrorMsg.required),
  commission: yup.string().required(ErrorMsg.required),
});

export const sellFormDefaultValues = {
  project_id: '',
  unit_id: '',
  client_id: '',
  seller_id: '',
  price: '',
  client: undefined,
  commission: 0,
  notes: '',
};
