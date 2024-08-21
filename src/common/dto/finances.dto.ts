interface salesStatDto {
  year: number;
  month: number;
  total: number;
}

export interface FinancesDto {
  payments_received: number;
  pending_payments: number;
  total_capacity: number;
  stages: {
    separations: number;
    payment_plans_in_progress: number;
    payment_plans_completed: number;
    financed: number;
  },
  status: {
    available_unit: number | null;
    sold_unit: number | null;
    reserved_unit: number | null;
  },
  sales: salesStatDto[],
}
