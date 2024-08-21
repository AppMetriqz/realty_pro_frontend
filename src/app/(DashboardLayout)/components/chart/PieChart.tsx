import React from 'react';
import {Box, Typography,} from "@mui/material";
import {UsePageProps} from "@/app/(DashboardLayout)/finance/usePage";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

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

                    <Box width={'100%'}  display={'flex'} alignItems="center" >
                        <Box sx={{width: 30, height: 30, borderRadius: '100%', backgroundColor: "#E7E7E7"}} mr={"10px"}></Box>
                        <Box width={'100%'} display={'flex'} alignItems="center" justifyContent="space-between">
                            <Typography
                                color="#505050"
                                fontSize="16px"
                                fontWeight={400}
                                letterSpacing={'0.5px'}
                            >
                                Disponible:
                            </Typography>
                            <Typography
                                color="#505050"
                                fontSize="16px"
                                fontWeight={600}
                                letterSpacing={'0.5px'}
                            >
                                US${available_unit}
                            </Typography>
                        </Box>
                    </Box>

                    <Box width={'100%'}  display={'flex'} alignItems="center" >
                        <Box sx={{width: 30, height: 30, borderRadius: '100%', backgroundColor: "#81E7AC"}} mr={"10px"}></Box>
                        <Box width={'100%'} display={'flex'} alignItems="center" justifyContent="space-between">
                            <Typography
                                color="#505050"
                                fontSize="16px"
                                fontWeight={400}
                                letterSpacing={'0.5px'}
                            >
                                Vendido:
                            </Typography>
                            <Typography
                                color="#505050"
                                fontSize="16px"
                                fontWeight={600}
                                letterSpacing={'0.5px'}
                            >
                                US${sold_unit}
                            </Typography>
                        </Box>
                    </Box>

                    <Box width={'100%'}  display={'flex'} alignItems="center" >
                        <Box sx={{width: 30, height: 30, borderRadius: '100%', backgroundColor: "#FFE4CF"}} mr={"10px"}></Box>
                        <Box width={'100%'} display={'flex'} alignItems="center" justifyContent="space-between">
                            <Typography
                                color="#505050"
                                fontSize="16px"
                                fontWeight={400}
                                letterSpacing={'0.5px'}
                            >
                                Reservado:
                            </Typography>
                            <Typography
                                color="#505050"
                                fontSize="16px"
                                fontWeight={600}
                                letterSpacing={'0.5px'}
                            >
                                US${reserved_unit}
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </>

    );
};
