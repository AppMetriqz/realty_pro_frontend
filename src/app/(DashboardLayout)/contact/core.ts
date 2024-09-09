import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';

export interface SpouseDto {
  contact_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number_1: string;
  national_id: string;
}

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
  spouse?: SpouseDto;
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
  spouse: undefined,
};

export const createContactValidationSchema = yup.object({
  type: yup.string().required(ErrorMsg.required),
  first_name: yup.string().required(ErrorMsg.required),
  last_name: yup.string().required(ErrorMsg.required),
});
