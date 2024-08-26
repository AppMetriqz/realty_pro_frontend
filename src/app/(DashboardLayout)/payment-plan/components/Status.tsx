import React from 'react';
import {Box, Typography, Paper} from '@mui/material';
import {UsePageProps} from '@/app/(DashboardLayout)/payment-plan/usePage';
import {formatter} from "@/common/constants";
import _ from "lodash";

interface FiltersProps {
    usePageProps: UsePageProps;
}


export const Status = ({usePageProps}: FiltersProps) => {

    if (!usePageProps.paymentPlanStats.isSuccess){
        return <></>
    }

    const paymentPlanStats = usePageProps.paymentPlanStats.isSuccess? usePageProps.paymentPlanStats.data :{
        overdue_payments:{
            total:'0',
            qty:0,
        },
        pending_payments:{
            total:'0',
            qty:0,
        },
        financing_payments:{
            total:'0',
            qty:0,
        },
    }

    return (
        <>
            <Box
                display="flex"
                width={'100%'}
                gap={'32px'}
                alignItems={'center'}
                justifyContent={"center"}
                mt={'40px'}
            >
                <BoxStatus currency={usePageProps.currency} total={paymentPlanStats.overdue_payments.total} qty={paymentPlanStats.overdue_payments.qty} text={"Pagos atrasados"} color={"#F9A0A0"}/>
                <BoxStatus currency={usePageProps.currency} total={paymentPlanStats.pending_payments.total} qty={paymentPlanStats.pending_payments.qty} text={"Pagos pendiente"} color={"#C2E6FA"}/>
                <BoxStatus currency={usePageProps.currency} total={paymentPlanStats.financing_payments.total} qty={paymentPlanStats.financing_payments.qty} text={"Para finanzmiento"} color={"#81E7AC"}/>

            </Box>
        </>
    );
};


const BoxStatus = ({total, qty, text, color, currency}: { total: string | null, qty: number, text: string, color:string, currency:string }) => {
    return (
        <>
            <Box
                sx={{
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    borderLeft: `4px ${color}`,
                    borderLeftStyle:'solid',
                    width: "340px",
                    height: "126px",
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
                    alignItems:'flex-start',
                    justifyContent:'center',
                    display:'flex',
                    flexDirection:'column',
                    paddingLeft:'25px',
                    gap:'15px'
                }}
            >
                <Typography fontSize={'22px'} fontWeight={500}>{currency}{formatter.format(_.toNumber(total??0))}</Typography>
                <Typography fontSize={'14px'}><b>{qty}</b> {text}</Typography>
            </Box>
        </>
    );
};
