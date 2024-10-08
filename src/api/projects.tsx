'use client';
import axiosInstance from '@/config/api/api.config';
import {
  CurrencyTypeDto,
  ProjectDto,
  ProjectSummaryDto,
  SortByDto,
} from '@/common/dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import _ from 'lodash';
import { contacts } from './contacts';

export const projects = 'projects';

interface FindAllDto {
  pageSize: string | number;
  pageIndex: string | number;
  sortOrder?: keyof typeof SortByDto;
  sortBy?: string;
  dateFrom?: number;
  dateTo?: number;
}

export interface FindAllAutocompleteDto {
  description: string;
  currencyType?: keyof typeof CurrencyTypeDto;
  limit?: number;
}

export const useFindAll = (params: FindAllDto) => {
  return useQuery<{ rows: ProjectDto[]; count: number }, Error>({
    queryKey: [`${projects}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${projects}`, { params }),
    ...QueriesOptions,
  });
};

export const useFindAllAutocomplete = (params: FindAllAutocompleteDto) => {
  return useQuery<ProjectDto[], Error>({
    queryKey: [`${projects}FindAllAutocomplete`, params],
    queryFn: () => axiosInstance.get(`/${projects}/autocomplete`, { params }),
    ...QueriesOptions,
  });
};

export const useFindOne = (id: string | string[]) => {
  return useQuery<ProjectDto, Error>({
    queryKey: [projects, id],
    queryFn: () => axiosInstance.get(`/${projects}/${id}`),
    enabled: !!id,
  });
};

export const useFindSummary = (id: string | string[]) => {
  return useQuery<ProjectSummaryDto, Error>({
    queryKey: [`${projects}-summary`, id],
    queryFn: () => axiosInstance.get(`/${projects}/summary/${id}`),
  });
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${projects}Create`],
    mutationFn: (
      data: Omit<
        ProjectDto,
        | 'created_at'
        | 'updated_at'
        | 'cover_path'
        | 'unit_from_price'
        | 'unit_to_price'
      >
    ) =>
      axiosInstance.post(`/${projects}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${projects}FindAll`] });
      queryClient.invalidateQueries({
        queryKey: [`${projects}FindAllAutocomplete`],
      });
      queryClient.invalidateQueries({ queryKey: [projects] });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${projects}Update`],
    mutationFn: (
      data: Omit<
        ProjectDto,
        | 'created_at'
        | 'updated_at'
        | 'cover_path'
        | 'unit_from_price'
        | 'unit_to_price'
      >
    ) =>
      axiosInstance.put(`/${projects}/${data.project_id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`${contacts}PaymentPlans`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${projects}FindAllAutocomplete`],
      });
      queryClient.invalidateQueries({ queryKey: [`${projects}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [projects] });
      queryClient.invalidateQueries({
        queryKey: [`${projects}-summary`],
      });
    },
  });
};

export const useDelete = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${projects}Delete`],
    mutationFn: () => axiosInstance.delete(`/${projects}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${projects}FindAllAutocomplete`],
      });
      queryClient.invalidateQueries({ queryKey: [`${projects}FindAll`] });
    },
  });
};

export const apiProjects = {
  useFindAll,
  useFindAllAutocomplete,
  useFindOne,
  useFindSummary,
  useCreate,
  useUpdate,
  useDelete,
};
