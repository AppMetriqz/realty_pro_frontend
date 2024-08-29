'use client';
import axiosInstance from '@/config/api/api.config';
import { UnitDto, SortByDto, GetUnitDto, MultipleUnitDto } from '@/common/dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import _ from 'lodash';
import { projects } from './projects';
import { sales } from './sales';
import { contacts } from './contacts';

export const units = 'units';

interface FindAllDto {
  pageSize: string | number;
  pageIndex: string | number;
  sortOrder?: keyof typeof SortByDto;
  sortBy?: string;
  dateFrom?: number;
  dateTo?: number;
  status?: string;
  projectId?: string | string[] | number;
}

export interface FindAllAutocompleteDto {
  description: string;
}

export const useFindAll = (params: FindAllDto) => {
  return useQuery<{ rows: GetUnitDto[]; count: number }, Error>({
    queryKey: [`${units}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${units}`, { params }),
    ...QueriesOptions,
  });
};

export const useFindAllAutocomplete = (params: FindAllAutocompleteDto) => {
  return useQuery<GetUnitDto[], Error>({
    queryKey: [`${units}FindAllAutocomplete`, params],
    queryFn: () => axiosInstance.get(`/${units}/autocomplete`, { params }),
    ...QueriesOptions,
    enabled: _.size(params.description) > 1,
  });
};

export const useFindOne = (id: string | number | string[]) => {
  return useQuery<GetUnitDto, Error>({
    queryKey: [units, id],
    queryFn: () => axiosInstance.get(`/${units}/${id}`),
    enabled: !!id,
  });
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${units}Create`],
    mutationFn: (
      data: Omit<UnitDto, 'created_at' | 'updated_at' | 'cover_path'>
    ) =>
      axiosInstance.post(`/${units}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [projects] });
      queryClient.invalidateQueries({ queryKey: [`${projects}-summary`] });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${units}Update`],
    mutationFn: (
      data: Omit<UnitDto, 'created_at' | 'updated_at' | 'cover_path'>
    ) =>
      axiosInstance.put(`/${units}/${data.unit_id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${contacts}PaymentPlans`],
      });
      queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [units] });
      queryClient.invalidateQueries({ queryKey: [`${projects}-summary`] });
    },
  });
};

export const useUpdateAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${units}UpdateAll`],
    mutationFn: (data: MultipleUnitDto) =>
      axiosInstance.put(`/${units}/all/${data.project_id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [units] });
      queryClient.invalidateQueries({ queryKey: [`${projects}-summary`] });
    },
  });
};

export const useDelete = (id: string | number | string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${units}Delete`],
    mutationFn: (data: { notes: string }) =>
      axiosInstance.delete(`/${units}/${id}`, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
    },
  });
};

export const useDeleteAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${units}DeleteAll`],
    mutationFn: (data: {
      projectId: string | string[];
      notes: string;
      unit_ids: string;
    }) =>
      axiosInstance.delete(`/${units}/all/${data.projectId}`, {
        data: { notes: data.notes, unit_ids: data.unit_ids },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
    },
  });
};

export const useCancelSaleUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${units}cancel-sale`],
    mutationFn: (data: {
      notes: string;
      sale_id: string | number | string[];
    }) =>
      axiosInstance.delete(`/${sales}/${data.sale_id}`, {
        data: { notes: data.notes },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${units}FindAll`] });
    },
  });
};

export const apiUnits = {
  useFindAll,
  useFindAllAutocomplete,
  useFindOne,
  useCreate,
  useUpdate,
  useUpdateAll,
  useDelete,
  useDeleteAll,
  useCancelSaleUnit,
};
