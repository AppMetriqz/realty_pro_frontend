import React, {Dispatch, SetStateAction, useState} from "react";
import { apiDesktop} from '@/api';
import {CalendarEnumDto, GoogleCalendarDto, SaleStatDto} from "@/api/desktop";
import {UseQueryResult} from "@tanstack/react-query";
import {GetSellDto, UnitDto} from "@/common/dto";


export interface UsePageProps {
    times: keyof typeof CalendarEnumDto;
    handleChangeTimes: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleGoogleCalendarLogin: () => void;
    setSalesToAssignPageIndex: Dispatch<SetStateAction<number>>;
    setPaymentPlansToAssignPageIndex: Dispatch<SetStateAction<number>>;
    googleCalendar: UseQueryResult<GoogleCalendarDto[], Error>;
    sale: UseQueryResult<SaleStatDto[], Error>;
    salesToAssign: UseQueryResult<UnitDto[], Error>;
    paymentPlansToAssign: UseQueryResult<GetSellDto[], Error>;
}

export default function usePage() {

    const [times, setTimes] = useState<keyof typeof CalendarEnumDto>('today');
    const [salesToAssignPageIndex, setSalesToAssignPageIndex] = useState<number>(0);
    const [paymentPlansToAssignPageIndex, setPaymentPlansToAssignPageIndex] = useState<number>(0);
    const [isGoogleCalendarLogin, setIsGoogleCalendarLogin] = useState<boolean>(false);

    const googleCalendarLogin = apiDesktop.useGoogleCalendarLogin();
    const googleCalendar = apiDesktop.useGoogleCalendar({times: times}, isGoogleCalendarLogin);
    const sale = apiDesktop.useSale();
    const salesToAssign = apiDesktop.useSalesToAssign({pageIndex: salesToAssignPageIndex, pageSize:10});
    const paymentPlansToAssign = apiDesktop.usePaymentPlansToAssign({pageIndex:paymentPlansToAssignPageIndex, pageSize:10});

    const handleChangeTimes = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const value = target.value as keyof typeof CalendarEnumDto
        setTimes(value);
    };

    const handleGoogleCalendarLogin = async () => {
         await googleCalendarLogin.mutateAsync()
    };

    return {
        handleChangeTimes,
        times,
        setSalesToAssignPageIndex,
        setPaymentPlansToAssignPageIndex,
        handleGoogleCalendarLogin,
        googleCalendar,
        sale,
        salesToAssign,
        paymentPlansToAssign,
    };
}
