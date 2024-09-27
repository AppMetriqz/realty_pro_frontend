'use client';
import axiosInstance from '@/config/api/api.config';
import {
  CreateContactDto,
  GetContactDto,
  GetContactPaymentPlanDto,
  SortByDto,
  UpdateContactDto,
} from '@/common/dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import _ from 'lodash';

export const contacts = 'contacts';

interface FindAllDto {
  pageSize: string | number;
  pageIndex: string | number;
  sortOrder?: keyof typeof SortByDto;
  sortBy?: string;
  dateFrom?: number;
  dateTo?: number;
  type: string;
  searchText?: string;
}

interface FindContactPaymentPlan {
  status: string;
}

export type FindAllAutocompleteDto = {
  description: string;
  limit?: number;
};

export const useFindAll = (params: FindAllDto) => {
  return useQuery<{ rows: GetContactDto[]; count: number }, Error>({
    queryKey: [`${contacts}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${contacts}`, { params }),
    ...QueriesOptions,
  });
};

export const useFindPaymentPlans = (
  contact_id: string | string[],
  params: FindContactPaymentPlan
) => {
  return useQuery<GetContactPaymentPlanDto[], Error>({
    queryKey: [`${contacts}PaymentPlans`, params],
    queryFn: () =>
      axiosInstance.get(`/${contacts}/payment-plans/${contact_id}`, { params }),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    gcTime: 0,
    staleTime: 0,
  });
};

export const useFindAllAutocomplete = (params: FindAllAutocompleteDto) => {
  return useQuery<GetContactDto[], Error>({
    queryKey: [`${contacts}FindAllAutocomplete`, params],
    queryFn: () => axiosInstance.get(`/${contacts}/autocomplete`, { params }),
    ...QueriesOptions,
    // enabled: _.size(params.description) > 1,
  });
};

export const useFindOne = (id: string | string[]) => {
  return useQuery<GetContactDto, Error>({
    queryKey: [contacts, id],
    queryFn: () => axiosInstance.get(`/${contacts}/${id}`),
    enabled: !!id,
  });
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${contacts}Create`],
    mutationFn: (data: CreateContactDto) =>
      axiosInstance.post(`/${contacts}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${contacts}FindAll`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${contacts}FindAllAutocomplete`],
      });
      queryClient.invalidateQueries({ queryKey: [contacts] });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${contacts}Update`],
    mutationFn: (
      data: Omit<UpdateContactDto, 'created_by' | 'created_at' | 'updated_at'>
    ) => axiosInstance.put(`/${contacts}/${data.contact_id}`, data),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: [`${contacts}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [contacts] });
      queryClient.invalidateQueries({
        queryKey: [`${contacts}FindAllAutocomplete`],
      });
    },
  });
};

export const useAddSpouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${contacts}AddSpouse`],
    mutationFn: (data: { contact_id: string | string[]; spouse_id?: number }) =>
      axiosInstance.put(`/${contacts}/${data.contact_id}`, {
        spouse_id: data.spouse_id,
      }),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: [`${contacts}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [contacts] });
    },
  });
};

export const useDelete = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${contacts}Delete`],
    mutationFn: () => axiosInstance.delete(`/${contacts}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${contacts}FindAll`] });
    },
  });
};

export const apiContacts = {
  useFindAll,
  useFindPaymentPlans,
  useFindAllAutocomplete,
  useFindOne,
  useCreate,
  useUpdate,
  useAddSpouse,
  useDelete,
};
