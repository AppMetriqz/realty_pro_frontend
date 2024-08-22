interface SalesStatDto {
  year: number;
  month: number;
  total: number;
}

interface StatusDto {
  amount: string | null,
  qty: number
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
    available_unit: StatusDto;
    sold_unit: StatusDto;
    reserved_unit: StatusDto;
  },
  sales: SalesStatDto[],
}
