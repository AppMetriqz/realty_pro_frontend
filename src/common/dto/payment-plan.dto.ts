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
  total: string | null;
  qty: number;
}

export interface GetPaymentPlanStatDto {
  overdue_payments: Stat;
  pending_payments: Stat;
  financing_payments: Stat;
}
export interface PaymentPlanToAssignDto {
  sale_id: number;
  project_id: number;
  unit_id: number;
  client_id: number;
  seller_id: number;
  price: string;
  commission: number;
  notes?: string;
  stage: string;
  is_active: true;
  create_by: 1;
  update_by?: number;
  created_at: string;
  updated_at?: string;
  project: {
    project_id: number;
    name: string;
    description: string;
  };
  unit: {
    unit_id: number;
    name: string;
    description: string;
  };
  client: {
    contact_id: number;
    first_name: string;
    last_name: string;
  };
}

export interface CreatePaymentPlanDto {
  sale_id: number;
  separation_amount: number;
  separation_date: string;
  payment_plan_numbers: number;
  separation_rate: number;
  is_resale: boolean; // true si es reventa
  total_amount?: number; // enviar solo si es una reventa
  client_id?: number; // enviar solo si es una reventa
}
