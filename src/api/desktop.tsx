'use client';
import axiosInstance from '@/config/api/api.config';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QueriesOptions} from '@/common/constants/react-query';
import {GetSellDto, GetUnitDto, UnitDto} from "@/common/dto";

export const desktop = 'desktop';

export enum CalendarEnumDto {
    today = "today",
    next_7_days = "next_7_days",
    next_month = "next_month"
}

export interface FindCalendarDto {
    times: keyof typeof CalendarEnumDto;
}

export interface SaleStatDto {
    year: number,
    month: number,
    total: number
}

export interface GoogleCalendarDto {
    isNeedLogin: boolean,
    data: {
        summary: string,
        start: string,
        end: string
    }[]
}

export interface FindAllDto {
    pageSize: string | number;
    pageIndex: string | number;
}

export interface SalesToAssignDto {
    count: number,
    rows: GetUnitDto[]
}



export interface PaymentPlansToAssignDto {
    count: number,
    rows: GetSellDto[]
}


export const useGoogleCalendarLogin = () => {
    const queryClient = useQueryClient();
    return useMutation<string>({
        mutationKey: [`${desktop}-calendar-login`],
        mutationFn: () => axiosInstance.get(`/${desktop}/google/calendar-login`),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [`${desktop}-calendar-login`] });
        },
    });
};

export const useGoogleCalendar = (params: FindCalendarDto) => {
    return useQuery<GoogleCalendarDto, Error>({
        queryKey: [`${desktop}-calendar`, params],
        queryFn: () => axiosInstance.get(`/${desktop}/google/calendar`, {params}),
        ...QueriesOptions,
    });
};

export const useSale = () => {
    return useQuery<SaleStatDto[], Error>({
        queryKey: [`${desktop}-sales`],
        queryFn: () => axiosInstance.get(`/${desktop}/sales`),
        ...QueriesOptions,
    });
};

export const useSalesToAssign = (params: FindAllDto) => {
    return useQuery<SalesToAssignDto, Error>({
        queryKey: [`${desktop}-sales-to-assign`, params],
        queryFn: () => axiosInstance.get(`/${desktop}/sales-to-assign`, {params}),
        ...QueriesOptions,
    });
};

export const usePaymentPlansToAssign = (params: FindAllDto) => {
    return useQuery<PaymentPlansToAssignDto, Error>({
        queryKey: [`${desktop}-payment-plans-to-assign`, params],
        queryFn: () => axiosInstance.get(`/${desktop}/payment-plans-to-assign`, {params}),
        ...QueriesOptions,
    });
};

export const apiDesktop = {
    useGoogleCalendarLogin,
    useGoogleCalendar,
    useSale,
    useSalesToAssign,
    usePaymentPlansToAssign,
};
