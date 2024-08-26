import { GetSellDto } from '@/common/dto';
import { DateTime } from 'luxon';
import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants';
import {
  formatCurrency,
  fromStringCurrencyToFloat,
} from '@/common/utils/numericHelpers';

export interface PaymentPlansToAssignTableDto {
  id: string | number;
  project: string;
  unit: string;
  client: string;
  date: string;
  actions: string | number;
}
export const assignBtnStyle = {
  color: '#18A1EE',
  fontSize: '14px',
  fontWeight: 500,
  '&:hover': {
    color: '#5FBEF3',
    backgroundColor: 'transparent',
  },
};

export const mapPaymentPlansToAssignTable = (
  sale: GetSellDto
): PaymentPlansToAssignTableDto => {
  return {
    ...sale,
    id: sale.sale_id,
    project: sale.project.name,
    unit: sale.unit.name,
    client: `${sale.client.first_name} ${sale.client.last_name}`,
    date: DateTime.fromISO(sale.created_at).toLocaleString(),
    actions: sale.sale_id,
  };
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
  commission: 0,
  notes: '',
};

export type CreateUpdatePaymentPlanType = {
  sale_id: number;
  separation_amount: string;
  separation_date: string;
  payment_plan_numbers: number;
  separation_rate: number;
  is_resale: boolean; // true si es reventa
  total_amount?: string; // enviar solo si es una reventa
  client_id?: number; // enviar solo si es una reventa
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
        return initialAmount > 1000
          ? schema.notRequired()
          : schema.min(
              minValue,
              `El monto del inicial no puede ser menor a $1,000. El monto de separación debiera ser ${formatCurrency(
                minValue
              )}.`
            );
      }
    )
    .required(ErrorMsg.required),
  separation_date: yup.string().required(ErrorMsg.required),
  payment_plan_numbers: yup.number().required(ErrorMsg.required),
  separation_rate: yup
    .number()
    .min(0, 'El valor tiene que ser mayor a 0')
    .max(100, 'El valor tiene que ser menor a 100')
    .required(ErrorMsg.required),
});
