import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';

export interface ContactFormInput {
  contact_id?: string | number;
  type: string;
  spouse_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number_1: string;
  phone_number_2?: string;
  national_id: string;
  nationality: string;
  contact_method: string;
  date_of_birth: string;
  marital_status: string;
  workplace: string;
  work_occupation: string;
  address: string;
  notes?: string;
}

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

export const createContactValidationSchema = yup.object({
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
