import React, {Dispatch, SetStateAction, useState} from "react";
import { apiDesktop} from '@/api';
import {CalendarEnumDto, GoogleCalendarDto, PaymentPlansToAssignDto, SalesToAssignDto} from "@/api/desktop";
import {UseQueryResult} from "@tanstack/react-query";
import {LineOptions} from "@/app/(DashboardLayout)/components/chart/chartsOptions";
import _ from "lodash";
import {DateTime} from "luxon";
import {SelectChangeEvent} from "@mui/material/Select";


export interface UsePageProps {
    times: keyof typeof CalendarEnumDto;
    handleChangeTimes: (e: SelectChangeEvent) => void;
    handleGoogleCalendarLogin: () => void;
    setSalesToAssignPageIndex: Dispatch<SetStateAction<number>>;
    setSalesToAssignPageSize: Dispatch<SetStateAction<number>>;
    setPaymentPlansToAssignPageIndex: Dispatch<SetStateAction<number>>;
    setPaymentPlansToAssignPageSize: Dispatch<SetStateAction<number>>;
    googleCalendar: UseQueryResult<GoogleCalendarDto, Error>;
    salesToAssign: UseQueryResult<SalesToAssignDto, Error>;
    paymentPlansToAssign: UseQueryResult<PaymentPlansToAssignDto, Error>;
    isGoogleCalendarLogin: boolean;
    isLoadingCalendar: boolean;
    lineOptions: any;
    salesToAssignPageIndex: number;
    salesToAssignPageSize: number;
    paymentPlansToAssignPageIndex: number;
    paymentPlansToAssignPageSize: number;
}

export default function usePage() {

    const [times, setTimes] = useState<keyof typeof CalendarEnumDto>('today');

    const [salesToAssignPageIndex, setSalesToAssignPageIndex] = useState<number>(0);
    const [salesToAssignPageSize, setSalesToAssignPageSize] = useState<number>(10);

    const [paymentPlansToAssignPageIndex, setPaymentPlansToAssignPageIndex] = useState<number>(0);
    const [paymentPlansToAssignPageSize, setPaymentPlansToAssignPageSize] = useState<number>(10);

    const [isGoogleCalendarLogin, setIsGoogleCalendarLogin] = useState<boolean>(false);
    const [isLoadingCalendar, setIsLoadingCalendar] = useState<boolean>(true);
    const [lineOptions, setLineOptions] = React.useState<any>(LineOptions);

    const googleCalendarLogin = apiDesktop.useGoogleCalendarLogin();
    const googleCalendar = apiDesktop.useGoogleCalendar({times: times});
    const sale = apiDesktop.useSale();

    const salesToAssign = apiDesktop.useSalesToAssign({pageIndex: salesToAssignPageIndex, pageSize:salesToAssignPageSize});
    const paymentPlansToAssign = apiDesktop.usePaymentPlansToAssign({pageIndex:paymentPlansToAssignPageIndex, pageSize:paymentPlansToAssignPageSize});


    React.useEffect(()=>{
        (async ()=>{
            if (googleCalendar.isSuccess){
                setIsGoogleCalendarLogin(!googleCalendar.data.isNeedLogin)
                setIsLoadingCalendar(false)
            }
        })()
    },[googleCalendar.isSuccess, googleCalendar.data])

    React.useEffect(() => {
        if (sale.isSuccess) {
            const lineData = sale.data
            const seriesLine = [{
                showInLegend: false,
                data: _.map(lineData, "total")
            }]
            const xAxisLine = {
                categories: _.map(lineData, (item) => {
                    const monthName = DateTime.fromObject({month: item.month}).toFormat('LLLL');
                    return `${monthName} ${item.year}`
                })
            }
            setLineOptions((prevState: any) => ({...prevState, series: seriesLine, xAxis: xAxisLine}))
        }
    }, [sale.isSuccess, sale.data])

    const handleChangeTimes = (event: SelectChangeEvent) => {
        const value = event.target.value as keyof typeof CalendarEnumDto
        setIsLoadingCalendar(true)
        setTimes(value);
    };

    const handleGoogleCalendarLogin = async () => {
        setIsLoadingCalendar(true)
        const result = await googleCalendarLogin.mutateAsync()
        window.open(result, '_blank');
        setIsLoadingCalendar(false)
    };

    return {
        handleChangeTimes,
        times,
        isGoogleCalendarLogin,
        isLoadingCalendar,
        setSalesToAssignPageIndex,
        setPaymentPlansToAssignPageIndex,
        salesToAssignPageSize,
        setSalesToAssignPageSize,
        paymentPlansToAssignPageSize,
        setPaymentPlansToAssignPageSize,
        salesToAssignPageIndex,
        paymentPlansToAssignPageIndex,
        handleGoogleCalendarLogin,
        googleCalendar,
        salesToAssign,
        paymentPlansToAssign,
        lineOptions,
    };
}
