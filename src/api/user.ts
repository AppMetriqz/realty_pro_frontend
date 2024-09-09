'use client';
import axiosInstance from '@/config/api/api.config';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  CreateUpdateUserDto,
  CreateUserDto,
  GetUserDto,
  SortByDto,
} from '@/common/dto';
import { QueriesOptions } from '@/common/constants';

export const users = 'users';

interface FindAllDto {
  pageSize: string | number;
  pageIndex: string | number;
  sortOrder?: keyof typeof SortByDto;
  sortBy?: string;
  searchText?: string;
}

export const useFindAll = (params: FindAllDto) => {
  return useQuery<{ rows: GetUserDto[]; count: number }, Error>({
    queryKey: [`${users}FindAll`, params],
    queryFn: () => axiosInstance.get(`/${users}`, { params }),
    ...QueriesOptions,
  });
};

export const useFindOne = (userId: string | number | null) => {
  let id = userId;
  return useQuery<GetUserDto, Error>({
    queryKey: [users, { ID_PortalB2BUsuario: id }],
    queryFn: () => axiosInstance.get(`${users}/${id}`),
    enabled: !!id,
  });
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${users}Create`],
    mutationFn: (data: CreateUserDto) => axiosInstance.post(`${users}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${users}FindAll`] });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${users}Update`],
    mutationFn: (data: CreateUpdateUserDto) =>
      axiosInstance.put(`${users}/${data.user_id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${users}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [users] });
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${users}ChangePassword`],
    mutationFn: (data: { old_password: string; new_password: string }) =>
      axiosInstance.post(`${users}change-password`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${users}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [users] });
    },
  });
};

export const useDelete = (id: string | number | string[] | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`${users}Delete`],
    mutationFn: (data: { notes: string }) =>
      axiosInstance.delete(`${users}/${id}`, {
        data: { notes: data.notes },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${users}FindAll`] });
      queryClient.invalidateQueries({ queryKey: [users] });
    },
  });
};

export const apiUser = {
  useFindAll,
  useFindOne,
  useCreate,
  useUpdate,
  useChangePassword,
  useDelete,
};
