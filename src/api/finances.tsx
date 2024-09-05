'use client';
import axiosInstance from '@/config/api/api.config';
import { useQuery } from '@tanstack/react-query';
import {FinancesDto} from "@/common/dto";

export const finances = 'finances';

interface FindAllDto {
  projectIds: string;
}

export const useFindAll = (params: FindAllDto) => {
  return useQuery<FinancesDto, Error>({
    queryKey: [`${finances}`, params],
    queryFn: () => axiosInstance.get(`/${finances}`, { params }),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    gcTime:0,
    staleTime: 0,
  });
};

export const apiFinances = {
  useFindAll,
};
