'use client';
import axiosInstance from '@/config/api/api.config';
import {
  ProjectDto,
  SortByDto,
  PropertyFeaturesDto,
  PropertyTypeDto,
} from '@/common/dto';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
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
  type: string;
}

export interface FindAllAutocompleteDto {
  description: string;
}

export type ResultFindAllProjectFeatures = UseQueryResult<
  { rows: PropertyFeaturesDto[]; count: number },
  any
>;

export const useFindAll = (params: FindAllDto) => {
  return useQuery<{ rows: PropertyFeaturesDto[]; count: number }, any>({
    queryKey: [`${propertyFeatures}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${propertyFeatures}`, { params }),
    ...QueriesOptions,
    enabled: !_.isEmpty(params.type),
  });
};

export const useFindAllAutocomplete = (params: FindAllAutocompleteDto) => {
  return useQuery<ProjectDto[], FindAllAutocompleteDto>({
    queryKey: [`${propertyFeatures}FindAllAutocomplete`, params],
    queryFn: () =>
      axiosInstance.get(`/${propertyFeatures}/autocomplete`, { params }),
    ...QueriesOptions,
    enabled: _.size(params.description) > 1,
  });
};

export const useFindOne = (id: string | number) => {
  return useQuery<any, PropertyFeaturesDto>({
    queryKey: [propertyFeatures, id],
    queryFn: () => axiosInstance.get(`/${propertyFeatures}/${id}`),
    enabled: !!id,
  });
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${propertyFeatures}Create`],
    mutationFn: (data: PropertyFeaturesDto) =>
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
    mutationFn: (data: PropertyFeaturesDto) =>
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

export const apiPropertyFeatures = {
  useFindAll,
  useFindAllAutocomplete,
  useFindOne,
  useCreate,
  useUpdate,
};
