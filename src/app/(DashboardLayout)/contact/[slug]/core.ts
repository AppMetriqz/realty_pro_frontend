import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';
import { ContactFormInput } from '../core';
import {
  formatCurrency,
  fromStringCurrencyToFloat,
} from '@/common/utils/numericHelpers';
import { DateTime } from 'luxon';

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
});

export type ContactSpouseFormInput = {
  spouse_id?: number;
};

export const contactSpouseDefaultValues: ContactSpouseFormInput = {
  spouse_id: undefined,
};
export const addSpouseContactValidationSchema = yup.object({
  spouse_id: yup.number().required(ErrorMsg.required),
});

export type CreateUpdatePaymentPlanType = {
  sale_id: number;
  separation_amount: string;
  separation_date: string;
  payment_plan_numbers: number;
  separation_rate: number;
  is_resale: boolean; // true si es reventa
  total_amount?: string; // enviar solo si es una reventa
  client_id?: string; // enviar solo si es una reventa
};

export const createPaymentPlanDefaultValues = {
  sale_id: 0,
  separation_amount: '',
  separation_date: DateTime.now().toISODate(),
  payment_plan_numbers: 1,
  separation_rate: 30,
  is_resale: false,
};

export const createPaymentPlanValidationSchema = yup.object({
  total_amount: yup.string().required(ErrorMsg.required),
  separation_amount: yup
    .string()
    .when(
      ['total_amount', 'separation_rate'],
      ([total, separationRate], schema, node) => {
        const initialAmount =
          (separationRate / 100) * fromStringCurrencyToFloat(total) -
          fromStringCurrencyToFloat(node.value);
        const minValue =
          initialAmount + fromStringCurrencyToFloat(node.value) - 1000;
        const minGreaterThan0Msg =
          'El monto de separación tiene que ser mayor a 0.';
        const amountErrorMsg = `El monto del inicial no puede ser menor a $1,000. El monto de separación debiera ser ${formatCurrency(
          minValue
        )}.`;
        return fromStringCurrencyToFloat(node.value) <= 0
          ? schema.min(700, minGreaterThan0Msg)
          : initialAmount > 1000
          ? schema.notRequired()
          : schema.min(1000, amountErrorMsg);
      }
    )
    .required(ErrorMsg.required),
  is_resale: yup.boolean(),
  client_id: yup.string().when('is_resale', ([is_resale], schema) => {
    return is_resale ? schema.required(ErrorMsg.required) : schema.nullable();
  }),
  separation_date: yup.string().required(ErrorMsg.required),
  payment_plan_numbers: yup.number().required(ErrorMsg.required),
  separation_rate: yup
    .number()
    .min(0, 'El valor tiene que ser mayor a 0')
    .max(100, 'El valor tiene que ser menor a 100')
    .required(ErrorMsg.required),
});

export type CreateUpdatePaymentType = {
  payment_plan_id: number;
  separation_date: string;
  payment_made_at: string;
  amount: string;
  notes: string;
};
export const createPaymentValidationSchema = yup.object({
  amount: yup.string().required(ErrorMsg.required),
});

export const createPaymentDefaultValues = {
  payment_plan_id: 0,
  amount: '',
  separation_date: DateTime.now().toISODate(),
  payment_made_at: DateTime.now().toISODate(),
  notes: '',
};
