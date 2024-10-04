'use client';
import { GetUserDto } from '@/common/dto';
import axiosInstance from '@/config/api/api.config';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import routes from '@/common/constants/routes';

const path = 'auth';

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['signIn'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      axiosInstance.post(`${path}/login`, { email, password }),
    onSuccess: (data: any) => {
      Cookies.set('token', data.token);
      router.push(routes.dashboard);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useCurrentUser = () => {
  const router = useRouter();
  const user = useQuery<GetUserDto, Error>({
    queryKey: ['currentUser'],
    queryFn: () => axiosInstance.get(`${path}/user`),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    gcTime: 0,
    staleTime: 0,
    enabled: !!Cookies.get('token'),
  });

  let data: UseQueryResult<GetUserDto, Error> & { isAuth: boolean } = {
    ...user,
    isAuth: false,
  };

  if (!user.isPending && user.isError) {
    Cookies.remove('token');
    router.replace('/login');
  }

  if (user.data && user.data?.user_id) {
    data = { ...user, isAuth: true };
  }
  console.log({ data });
  return data;
};

export const apiAuth = {
  useSignIn,
  useCurrentUser,
};
