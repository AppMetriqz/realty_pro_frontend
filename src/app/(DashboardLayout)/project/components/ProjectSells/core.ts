import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';

export const deleteValidationSchema = yup.object({
  deleteInput: yup
    .string()
    .matches(/\bBORRAR VENTA\b/, ErrorMsg.match)
    .required(ErrorMsg.required),
  notes: yup.string().required(ErrorMsg.required),
});

export const deleteFormDefaultValues = {
  deleteInput: '',
  notes: '',
};

export const sellValidationSchema = yup.object({
  project_id: yup.string().required(ErrorMsg.required),
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
  commission: 0,
  notes: '',
};
