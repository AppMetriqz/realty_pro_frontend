export interface GetPaymentPlanDto {
  payment_plan_id: number;
  sale_id: number;
  project_id: number;
  unit_id: number;
  sale_type: string;
  total_amount: string;
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
