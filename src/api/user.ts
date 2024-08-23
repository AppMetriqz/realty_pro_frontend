'use client';
import axiosInstance from '@/config/api/api.config';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ApiPaginationDto, UserDto } from '@/common/dto';

const path = '/users';

export const useQueryUsers = ({ pageSize, pageIndex }: ApiPaginationDto) => {
  return useQuery<UserDto[], Error>({
    queryKey: ['user-list-paginated', pageSize, pageIndex],
    queryFn: () =>
      axiosInstance.get(`${path}?pageSize=${pageSize}&pageIndex=${pageIndex}`),
    placeholderData: keepPreviousData,
    staleTime: 2 * (1000 * 60),
    gcTime: 2 * (1000 * 60),
  });
};

export const useQueryUsersById = (userId: string | number | null) => {
  let id = userId;
  return useQuery<UserDto, Error>({
    queryKey: ['usuario-ById', { ID_PortalB2BUsuario: id }],
    queryFn: () => axiosInstance.get(`${path}/${id}`),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['userCreate'],
    mutationFn: (data: UserDto) => axiosInstance.post(path, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list-paginated'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['userUpdate'],
    mutationFn: (data: UserDto) =>
      axiosInstance.put(`${path}/${data.ID_PortalB2BUsuario}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list-paginated'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['userDelete'],
    mutationFn: (id: number) => axiosInstance.delete(`${path}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list-paginated'] });
    },
  });
};

export const apiUser = {
  useQueryUsers,
  useQueryUsersById,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
};
