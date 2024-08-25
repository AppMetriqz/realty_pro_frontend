export type GetPaymentPlanDto = {
  payment_plan_detail_id: number;
  sale_id: number;
  project_id: number;
  unit_id: number;
  sale_type: string;
  total_amount: string;
  payment_amount: number;
  payment_date: string;
  separation_amount: number;
  separation_date: string;
  payment_plan_numbers: number;
  separation_rate: number;
  status: string;
  notes: string;
  is_active: boolean;
  create_by: number;
  update_by: number;
  created_at: string;
  updated_at: string;
  sale: {
    sale_id: number;
    stage: string;
  };
  payment_plan: {
    payment_plan_id: number;
    status: string;
    sale_type: string;
  };
  project: {
    project_id: number;
    name: string;
    currency_type: string;
  };
  unit: {
    unit_id: number;
    name: string;
  };
  client: {
    contact_id: number;
    first_name: string;
    last_name: string;
    phone_number_1: string;
  };
  remaining_time:{
    days:number
    hours:number
  }
}

interface Stat {
  total: string | null,
  qty: number
}

export interface GetPaymentPlanStatDto {
  overdue_payments: Stat;
  pending_payments: Stat;
  financing_payments: Stat;
}
