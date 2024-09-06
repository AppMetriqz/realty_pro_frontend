import React from 'react';
import {Box, Typography,} from "@mui/material";
import {UsePageProps} from "@/app/(DashboardLayout)/finance/usePage";
import {formatter} from "@/common/constants";
import _ from "lodash";

interface FiltersProps {
    usePageProps: UsePageProps
}

export const LineBarChart = ({usePageProps}: FiltersProps) => {

    const payments_received = usePageProps.lineBarOptions.payments_received;
    const pending_payments = usePageProps.lineBarOptions.pending_payments;
    const total_capacity = usePageProps.lineBarOptions.total_capacity;
    const total_capacity_diff = total_capacity - (payments_received + pending_payments)
    const total = payments_received + pending_payments

    return (
        <>
            <Box display={'flex'} alignItems="center" justifyContent="space-around" width={'100%'} mb={"32px"}>
                <TextAmount name={"Pagos Recibido"} amount={usePageProps.finances.isSuccess? usePageProps.finances?.data.payments_received : 0} currency={usePageProps.currency} color={"#70E798"}/>
                <TextAmount name={"Pagos Pendiente"} amount={usePageProps.finances.isSuccess? usePageProps.finances?.data.pending_payments:0} currency={usePageProps.currency} color={"#B9E5FF"}/>
                <TextAmount name={"Capacidad Total"} amount={usePageProps.finances.isSuccess? usePageProps.finances?.data.total_capacity:0} currency={usePageProps.currency} color={"#E7E7E7"}/>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '30px',
                    display: 'flex',
                    overflow: 'hidden',
                    border: 'none',
                    borderWidth: !total ? 2 : 0,
                    borderColor: '#eee',
                    borderStyle: 'solid'
                }}
            >
                <Box
                    sx={{
                        width: `${(payments_received / total)*100}%`,
                        backgroundColor: '#70E798',
                    }}
                />
                <Box
                    sx={{
                        width: `${(pending_payments / total)*100}%`,
                        backgroundColor: '#B9E5FF'
                    }}
                />
                <Box
                    sx={{
                        width: `${(total_capacity_diff / total)*100}%`,
                        backgroundColor: '#E7E7E7'
                    }}
                />
            </Box>

        </>
    );
};


const TextAmount = ({name, currency, amount, color}: {
    name: string,
    currency: string,
    amount: number | string,
    color: string
}) => {
    return (
        <Box display={'flex'} alignItems="center">
            <Box sx={{width: 30, height: 30, borderRadius: '100%', backgroundColor: color}} mr={"10px"}></Box>
            <Typography
                color="#505050"
                fontSize="16px"
                fontWeight={500}
                letterSpacing={'0.5px'}
            >
                {name}: <b>{currency}{formatter.format(_.toNumber(amount))}</b>
            </Typography>
        </Box>
    )
}
