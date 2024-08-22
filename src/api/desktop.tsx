'use client';
import axiosInstance from '@/config/api/api.config';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QueriesOptions} from '@/common/constants/react-query';
import {GetSellDto, UnitDto} from "@/common/dto";

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
    summary: string,
    start: Date,
    end: Date
}

export interface FindAllDto {
    pageSize: string | number;
    pageIndex: string | number;
}

export const useGoogleCalendarLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [`${desktop}-calendar-login`],
        mutationFn: () => axiosInstance.post(`/${desktop}/google/calendar-login`),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [`${desktop}-calendar-login`] });
        },
    });
};

export const useGoogleCalendar = (params: FindCalendarDto, isEnabled:boolean) => {
    return useQuery<GoogleCalendarDto[], Error>({
        queryKey: [`${desktop}-calendar`, params],
        queryFn: () => axiosInstance.get(`/${desktop}/google/calendar`, {params}),
        ...QueriesOptions,
        enabled:isEnabled
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
    return useQuery<UnitDto[], Error>({
        queryKey: [`${desktop}-sales-to-assign`, params],
        queryFn: () => axiosInstance.get(`/${desktop}/sales-to-assign`, {params}),
        ...QueriesOptions,
    });
};

export const usePaymentPlansToAssign = (params: FindAllDto) => {
    return useQuery<GetSellDto[], Error>({
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
