'use client';
import { GetUserDto } from '@/common/dto';
import axiosInstance from '@/config/api/api.config';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const path = 'auth';

export const useSignIn = () => {
  return useMutation({
    mutationKey: ['signIn'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      axiosInstance.post(`${path}/login`, { email, password }),
    onSuccess: (data: any, variables, context) => {
      if (data.token) {
        Cookies.set('token', data.token);
      }
    },
  });
};

export const useCurrentUser = () => {
  let isEnabled = false;
  if (Cookies.get('token')) {
    isEnabled = true;
  }

  const user = useQuery<GetUserDto, Error>({
    queryKey: ['currentUser'],
    queryFn: () => axiosInstance.get(`${path}/user`),
    staleTime: 10 * 80000,
    gcTime: 10 * 80000,
    retry: 3,
    enabled: isEnabled,
  });

  let data: UseQueryResult<GetUserDto, Error> & { isAuth: boolean } = {
    ...user,
    isAuth: false,
  };

  const router = useRouter();

  if (!user.isPending && user.isError) {
    Cookies.remove('token');
    router.replace('/login');
  }

  if (user.data && user.data?.user_id) {
    data = { ...user, isAuth: true };
  }

  return data;
};

export const apiAuth = {
  useSignIn,
  useCurrentUser,
};
