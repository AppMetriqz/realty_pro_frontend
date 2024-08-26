'use client';
import axiosInstance from '@/config/api/api.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import {
  GetPaymentPlanStatDto,
  GetPaymentPlanDto,
  CreatePaymentPlanDto,
} from '@/common/dto';
import { desktop } from './desktop';

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

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${paymentPlans}Create`],
    mutationFn: (data: CreatePaymentPlanDto) =>
      axiosInstance.post(`/${paymentPlans}`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`${desktop}-sales-to-assign`],
      });
      await queryClient.invalidateQueries({
        queryKey: [`${desktop}-payment-plans-to-assign`],
      });
    },
  });
};

export const useFindAll = (params: FindAllDto) => {
  return useQuery<GetPaymentPlanDto[], Error>({
    queryKey: [`${paymentPlans}`, params],
    queryFn: () => axiosInstance.get(`/${paymentPlans}`, { params }),
    ...QueriesOptions,
  });
};

export const apiPaymentPlans = {
  useFindAllStats,
  useFindAll,
  useCreate,
};
