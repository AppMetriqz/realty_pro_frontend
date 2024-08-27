'use client';
import axiosInstance from '@/config/api/api.config';
import {
  SortByDto,
  GetPaymentDto,
  CreatePaymentDto,
  UpdatePaymentDto,
} from '@/common/dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import _ from 'lodash';
import { units } from './units';
import { desktop } from './desktop';
import { contacts } from './contacts';

export const payments = 'payments';

interface FindAllDto {
  pageSize: string | number;
  pageIndex: string | number;
  sortOrder?: keyof typeof SortByDto;
  sortBy?: string;
}

export const useFindAll = (params: FindAllDto) => {
  return useQuery<{ rows: GetPaymentDto[]; count: number }, Error>({
    queryKey: [`${payments}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${payments}`, { params }),
    ...QueriesOptions,
  });
};

export const useFindOne = (id: string | string[]) => {
  return useQuery<GetPaymentDto, Error>({
    queryKey: [payments, id],
    queryFn: () => axiosInstance.get(`/${payments}/${id}`),
    enabled: !!id,
  });
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${payments}Create`],
    mutationFn: (data: CreatePaymentDto) =>
      axiosInstance.post(`/${payments}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${payments}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
      queryClient.invalidateQueries({
        queryKey: [`${contacts}FindAll`],
      });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${payments}Update`],
    mutationFn: (data: UpdatePaymentDto) =>
      axiosInstance.put(`/${payments}/${data.sale_id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${desktop}-payments-to-assign`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${desktop}-payments-plans-to-assign`],
      });
      queryClient.invalidateQueries({ queryKey: [`${payments}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [payments] });
    },
  });
};

export const useDelete = (id: string | number | string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${payments}Delete`],
    mutationFn: (data: { notes: string }) =>
      axiosInstance.delete(`/${payments}/${id}`, {
        data: { notes: data.notes },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${payments}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
    },
  });
};

export const apiPayments = {
  useFindAll,
  useFindOne,
  useCreate,
  useUpdate,
  useDelete,
};
