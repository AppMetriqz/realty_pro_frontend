import React from 'react';
import {Box, Typography,} from "@mui/material";
import {UsePageProps} from "@/app/(DashboardLayout)/finance/usePage";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
interface FiltersProps {
    usePageProps: UsePageProps
}

export const LineBarChart = ({usePageProps}: FiltersProps) => {

    return (
        <>
            <Box display={'flex'} alignItems="center" justifyContent="space-around" width={'100%'}>

                <Box display={'flex'} alignItems="center">
                    <Box sx={{width: 30, height: 30, borderRadius: '100%', backgroundColor: "#70E798"}}
                         mr={"10px"}></Box>
                    <Typography
                        color="#505050"
                        fontSize="16px"
                        fontWeight={500}
                        letterSpacing={'0.5px'}
                    >
                        Pagos Recibido: <b>US${usePageProps.finances?.data.payments_received}</b>
                    </Typography>
                </Box>


                <Box display={'flex'} alignItems="center">
                    <Box sx={{width: 30, height: 30, borderRadius: '100%', backgroundColor: "#B9E5FF"}}
                         mr={"10px"}></Box>
                    <Typography
                        color="#505050"
                        fontSize="16px"
                        fontWeight={500}
                        letterSpacing={'0.5px'}
                    >
                        Pagos Pendiente: <b>US${usePageProps.finances?.data.pending_payments}</b>
                    </Typography>
                </Box>

                <Box display={'flex'} alignItems="center">
                    <Box sx={{width: 30, height: 30, borderRadius: '100%', backgroundColor: "#E7E7E7"}} mr={"10px"}></Box>
                    <Typography
                        color="#505050"
                        fontSize="16px"
                        fontWeight={500}
                        letterSpacing={'0.5px'}
                    >
                        Capacidad Total: <b>US${usePageProps.finances?.data.total_capacity}</b>
                    </Typography>
                </Box>

            </Box>
            <HighchartsReact
                highcharts={Highcharts}
                options={usePageProps.lineBarOptions}
            />
        </>
    );
};
