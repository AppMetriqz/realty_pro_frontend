export type CreateContactDto = {
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
  notes?: string;
};
export type UpdateContactDto = {
  contact_id: number | string | string[];
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
  notes?: string;
};

export type GetContactDto = {
  contact_id: number;
  spouse?: {
    contact_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number_1: string;
    national_id: string;
  };
  type: string;
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
  is_active: boolean;
  create_by: number;
  update_by?: number;
  created_at: string;
  updated_at: string;
};

export type PaymentPlanDetailDto = {
  payment_amount: string;
  amount_paid: string;
  total_amount_paid: string;
  payment_number: number;
  payment_date: string;
  sale_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  paid_at: string;
  payment_made_at: string;
};

export type PaymentType = {
  payment_id: number;
  amount: number;
  payment_made_at: string;
  created_at: string;
  notes: string | null;
};

export type GetContactPaymentPlanDto = {
  payment_plan_id: number;
  project_id: number;
  unit_id: number;
  sale_id: number;
  sale_type: string;
  total_amount: string;
  separation_amount: string;
  separation_date: string;
  payment_plan_numbers: number;
  separation_rate: number;
  status: string;
  notes?: string;
  is_active: boolean;
  create_by: number;
  update_by?: number;
  created_at: string;
  updated_at?: string;
  total_payment_amount: string;
  total_amount_paid: string;
  total_financing: number;
  project: {
    project_id: number;
    name: string;
    description: string;
    currency_type: string;
  };
  unit: {
    unit_id: number;
    name: string;
    description: string;
  };
  sale: {
    sale_id: number;
    price: string;
    commission: number;
    stage: string;
    financed_at?: string | null;
    client: {
      contact_id: number;
      first_name: string;
      last_name: string;
    };
  };
  payment_plan_details: PaymentPlanDetailDto[];
  payments: PaymentType[];
};
