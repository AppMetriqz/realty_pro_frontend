'use client';
import axiosInstance from '@/config/api/api.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import { desktop } from './desktop';
import {
  GetPaymentPlanStatDto,
  GetPaymentPlanDto,
  CurrencyTypeDto,
  CreatePaymentPlanDto,
} from '@/common/dto';
import { contacts } from './contacts';

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
  planFilterStats?: string;
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

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${paymentPlans}Create`],
    mutationFn: (data: CreatePaymentPlanDto) =>
      axiosInstance.post(`/${paymentPlans}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${desktop}-sales-to-assign`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${desktop}-payment-plans-to-assign`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${contacts}PaymentPlans`],
      });
    },
  });
};

export const useFindAll = (params: FindAllDto) => {
  return useQuery<{ count: number; rows: GetPaymentPlanDto[] }, Error>({
    queryKey: [`${paymentPlans}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${paymentPlans}`, { params }),
    ...QueriesOptions,
  });
};

export const useFindAllFinancing = (params: FindAllDto) => {
  return useQuery<{ count: number; rows: GetPaymentPlanDto[] }, Error>({
    queryKey: [`${paymentPlans}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${paymentPlans}/financing`, { params }),
    ...QueriesOptions,
  });
};

export const apiPaymentPlans = {
  useFindAllStats,
  useFindAll,
  useFindAllFinancing,
  useCreate,
};
