'use client';
import axiosInstance from '@/config/api/api.config';
import {
  SortByDto,
  CreateSellDto,
  GetSellDto,
  UpdateSellDto,
  CreateAllSellDto,
} from '@/common/dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import _ from 'lodash';
import { units } from './units';

export const sales = 'sales';

interface FindAllDto {
  pageSize: string | number;
  pageIndex: string | number;
  sortOrder?: keyof typeof SortByDto;
  sortBy?: string;
  dateFrom?: number;
  dateTo?: number;
  stage?: string | string[];
  projectId: string | string[];
}

export interface FindAllAutocompleteDto {
  description: string;
}

export const useFindAll = (params: FindAllDto) => {
  return useQuery<{ rows: GetSellDto[]; count: number }, Error>({
    queryKey: [`${sales}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${sales}`, { params }),
    ...QueriesOptions,
  });
};

export const useFindAllAutocomplete = (params: FindAllAutocompleteDto) => {
  return useQuery<{ rows: GetSellDto[]; count: number }, Error>({
    queryKey: [`${sales}FindAllAutocomplete`, params],
    queryFn: () => axiosInstance.get(`/${sales}/autocomplete`, { params }),
    ...QueriesOptions,
    enabled: _.size(params.description) > 1,
  });
};

export const useFindOne = (id: string | string[]) => {
  return useQuery<GetSellDto, Error>({
    queryKey: [sales, id],
    queryFn: () => axiosInstance.get(`/${sales}/${id}`),
    enabled: !!id,
  });
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${sales}Create`],
    mutationFn: (data: CreateSellDto) => axiosInstance.post(`/${sales}`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`${sales}FindAll`] });
      await queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
    },
  });
};

export const useCreateAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${sales}CreateAll`],
    mutationFn: (data: CreateAllSellDto) =>
      axiosInstance.post(`/${sales}/all`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`${sales}FindAll`] });
      await queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${sales}Update`],
    mutationFn: (data: UpdateSellDto) =>
      axiosInstance.put(`/${sales}/${data.sale_id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`${sales}FindAll`] });
      await queryClient.invalidateQueries({ queryKey: [sales] });
    },
  });
};

export const useDelete = (id: string | number | string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${sales}Delete`],
    mutationFn: (data: { notes: string }) =>
      axiosInstance.delete(`/${sales}/${id}`, {
        data: { notes: data.notes },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${sales}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
    },
  });
};

export const apiSales = {
  useFindAll,
  useFindAllAutocomplete,
  useFindOne,
  useCreate,
  useCreateAll,
  useUpdate,
  useDelete,
};
