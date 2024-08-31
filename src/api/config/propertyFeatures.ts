'use client';
import axiosInstance from '@/config/api/api.config';
import {
  SortByDto,
  GetPropertyFeaturesDto,
  PropertyFeaturesTypeDto,
  CreateUpdatePropertyFeaturesDto,
} from '@/common/dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueriesOptions } from '@/common/constants/react-query';
import _ from 'lodash';

const propertyFeatures = 'property-features';

interface FindAllDto {
  pageSize: string | number;
  pageIndex: string | number;
  sortOrder?: keyof typeof SortByDto;
  sortBy?: string;
  dateFrom?: number;
  dateTo?: number;
  type?: keyof typeof PropertyFeaturesTypeDto;
}

export const useFindAll = (params: FindAllDto, enabled?: boolean) => {
  return useQuery<{ rows: GetPropertyFeaturesDto[]; count: number }, Error>({
    queryKey: [`${propertyFeatures}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${propertyFeatures}`, { params }),
    ...QueriesOptions,
    enabled: enabled ? enabled : !_.isEmpty(params.type),
  });
};

export const useFindOne = (id: string | number) => {
  return useQuery<GetPropertyFeaturesDto, Error>({
    queryKey: [propertyFeatures, id],
    queryFn: () => axiosInstance.get(`/${propertyFeatures}/${id}`),
    enabled: !!id,
  });
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${propertyFeatures}Create`],
    mutationFn: (data: CreateUpdatePropertyFeaturesDto) =>
      axiosInstance.post(`/${propertyFeatures}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${propertyFeatures}FindAll`],
      });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${propertyFeatures}Update`],
    mutationFn: (data: CreateUpdatePropertyFeaturesDto) =>
      axiosInstance.put(
        `/${propertyFeatures}/${data.property_feature_id}`,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${propertyFeatures}FindAll`],
      });
    },
  });
};

export const useDelete = (id: string | number | string[] | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${propertyFeatures}Delete`],
    mutationFn: () => axiosInstance.delete(`${propertyFeatures}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${propertyFeatures}FindAll`],
      });
      queryClient.invalidateQueries({ queryKey: [propertyFeatures] });
    },
  });
};

export const apiPropertyFeatures = {
  useFindAll,
  useFindOne,
  useCreate,
  useUpdate,
  useDelete,
};
