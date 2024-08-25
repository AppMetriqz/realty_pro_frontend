'use client';
import axiosInstance from '@/config/api/api.config';
import { useQuery } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import {GetPaymentPlanStatDto, GetPaymentPlanDto, CurrencyTypeDto} from "@/common/dto";

export const paymentPlans = 'payment-plans';

interface FindAllStatsDto {
  projectIds: string;
  currencyType?: keyof typeof CurrencyTypeDto;
}

interface FindAllDto {
  pageSize: string | number;
  pageIndex: string | number;
  sortOrder?: string;
  sortBy?: string;
  dateFrom?: string;
  dateTo?: string;
  planFilterStats: string;
  projectIds: string;
  currencyType?: keyof typeof CurrencyTypeDto;
}

export const useFindAllStats = (params: FindAllStatsDto) => {
  return useQuery<GetPaymentPlanStatDto, Error>({
    queryKey: [`${paymentPlans}`, params],
    queryFn: () => axiosInstance.get(`/${paymentPlans}/stats`, { params }),
    ...QueriesOptions,
  });
};

export const useFindAll = (params: FindAllDto) => {
  return useQuery<{ count:number, rows:GetPaymentPlanDto[] }, Error>({
    queryKey: [`${paymentPlans}`, params],
    queryFn: () => axiosInstance.get(`/${paymentPlans}`, { params }),
    ...QueriesOptions,
  });
};

export const apiPaymentPlans = {
  useFindAllStats,
  useFindAll,
};
