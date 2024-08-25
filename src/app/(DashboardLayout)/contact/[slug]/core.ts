import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';
import { ContactFormInput } from '../core';

export const contactDefaultValues: ContactFormInput = {
  type: '',
  spouse_id: undefined,
  first_name: '',
  last_name: '',
  email: '',
  phone_number_1: '',
  phone_number_2: undefined,
  national_id: '',
  nationality: '',
  contact_method: '',
  date_of_birth: '',
  marital_status: '',
  workplace: '',
  work_occupation: '',
  address: '',
  notes: '',
};

export const updateContactValidationSchema = yup.object({
  type: yup.string().required(ErrorMsg.required),
  first_name: yup.string().required(ErrorMsg.required),
  last_name: yup.string().required(ErrorMsg.required),
  email: yup.string().email(ErrorMsg.email).required(ErrorMsg.required),
  phone_number_1: yup
    .string()
    .length(17, ErrorMsg.phone)
    .required(ErrorMsg.required),
  national_id: yup.string().required(ErrorMsg.required),
  nationality: yup.string().required(ErrorMsg.required),
  contact_method: yup.string().required(ErrorMsg.required),
  date_of_birth: yup.string().required(ErrorMsg.required),
  address: yup.string().required(ErrorMsg.required),
  workplace: yup.string().required(ErrorMsg.required),
  work_occupation: yup.string().required(ErrorMsg.required),
  marital_status: yup.string().required(ErrorMsg.required),
});
