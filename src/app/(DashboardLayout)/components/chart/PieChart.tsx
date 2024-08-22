import React from 'react';
import {Box, Typography,} from "@mui/material";
import {UsePageProps} from "@/app/(DashboardLayout)/finance/usePage";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {formatter} from "@/common/constants";

interface FiltersProps {
    usePageProps: UsePageProps
}

export const PieChart = ({usePageProps}: FiltersProps) => {

    if (!usePageProps.finances?.data) {
        return null
    }

    const available_unit = usePageProps.finances.data.status.available_unit?.amount ?? 0
    const sold_unit = usePageProps.finances.data.status.sold_unit?.amount ?? 0
    const reserved_unit = usePageProps.finances.data.status.reserved_unit?.amount ?? 0

    return (
        <>
            <Box display={'flex'} flexDirection={'row'}  alignItems="center" justifyContent="center">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={usePageProps.pieOptions}
                />
                <Box width={'295px'} display={'flex'} flexDirection={'column'} ml={"20px"} gap={'20px'} alignItems="flex-start">
                    <TextAmount name={"Disponible"} amount={available_unit} currency={usePageProps.currency} color={"#E7E7E7"} />
                    <TextAmount name={"Vendido"} amount={sold_unit} currency={usePageProps.currency} color={"#81E7AC"} />
                    <TextAmount name={"Reservado"} amount={reserved_unit} currency={usePageProps.currency} color={"#FFE4CF"} />
                </Box>
            </Box>
        </>

    );
};


const TextAmount =({name, currency, amount, color}:{name:string, currency:string, amount:number, color:string})=>{
    return (
        <Box width={'100%'}  display={'flex'} alignItems="center" >
            <Box sx={{width: 30, height: 30, borderRadius: '100%', backgroundColor: color}} mr={"10px"}></Box>
            <Box width={'100%'} display={'flex'} alignItems="center" justifyContent="space-between">
                <Typography
                    color="#505050"
                    fontSize="16px"
                    fontWeight={400}
                    letterSpacing={'0.5px'}
                >
                    {name}:
                </Typography>
                <Typography
                    color="#505050"
                    fontSize="16px"
                    fontWeight={600}
                    letterSpacing={'0.5px'}
                >
                    {currency}${formatter.format(amount)}
                </Typography>
            </Box>
        </Box>
    )
}
