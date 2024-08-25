'use client';
import axiosInstance from '@/config/api/api.config';
import { useQuery } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import {GetPaymentPlanStatDto, GetPaymentPlanDto} from "@/common/dto";

export const paymentPlans = 'payment-plans';

interface FindAllStatsDto {
  projectIds: string;
}

interface FindAllDto {
  pageSize: string;
  pageIndex: string;
  sortOrder?: string;
  sortBy?: string;
  dateFrom?: string;
  dateTo?: string;
  planFilterStats: string;
  projectIds: number[];
}

export const useFindAllStats = (params: FindAllStatsDto) => {
  return useQuery<GetPaymentPlanStatDto, Error>({
    queryKey: [`${paymentPlans}`, params],
    queryFn: () => axiosInstance.get(`/${paymentPlans}`, { params }),
    ...QueriesOptions,
  });
};

export const useFindAll = (params: FindAllDto) => {
  return useQuery<GetPaymentPlanDto[], Error>({
    queryKey: [`${paymentPlans}`, params],
    queryFn: () => axiosInstance.get(`/${paymentPlans}`, { params }),
    ...QueriesOptions,
  });
};

export const apiFinances = {
  useFindAllStats,
  useFindAll,
};
