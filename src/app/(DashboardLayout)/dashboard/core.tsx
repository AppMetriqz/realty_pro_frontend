import { GetSellDto } from '@/common/dto';
import { formatCurrency } from '@/common/utils/numericHelpers';
import { DateTime } from 'luxon';
import { SaleToAssignDto } from '@/api/desktop';
import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants';

export interface SalesToAssignTableDto {
  id: string | number;
  project: string;
  unit: string;
  price: string;
  date: string;
  actions: string | number;
}

export const mapSalesToAssignTable = (
  sale: SaleToAssignDto
): SalesToAssignTableDto => {
  return {
    id: sale.sale_id,
    unit: sale.unit.name,
    project: sale.project.name,
    price: formatCurrency(parseFloat(sale.price)),
    date: DateTime.fromISO(sale.created_at).toLocaleString(),
    actions: sale.sale_id,
  };
};

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
