import React from 'react';
import {Box, Typography, CircularProgress} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import {DateTime} from "luxon";

import {UsePageProps} from "@/app/(DashboardLayout)/dashboard/usePage";
import Button from "@mui/material/Button";

interface FiltersProps {
    usePageProps: UsePageProps
}

export const GoogleCalendar = ({usePageProps}: FiltersProps) => {
    return (
        <>
            <Box
                display="flex"
                width={'100%'}
                gap={'20px'}
                alignItems={'flex-start'}
                flexDirection={'column'}
            >

                <Box display="flex" flexDirection={'row'} gap={'20px'} mb={'40px'} alignItems={'center'}>
                    <Typography
                        color="#505050"
                        fontSize="18px"
                        fontWeight={500}
                        letterSpacing={'0.5px'}
                    >
                        Eventos en Google Calendar
                    </Typography>
                    <Select
                        style={{height: 30}}
                        autoWidth
                        value={usePageProps.times}
                        onChange={usePageProps.handleChangeTimes}
                    >
                        <MenuItem value={'today'}>Hoy</MenuItem>
                        <MenuItem value={'next_7_days'}>Proximos 7 dias</MenuItem>
                        <MenuItem value={'next_month'}>Proximo mes</MenuItem>
                    </Select>
                </Box>


                <Box height={"350px"} width={'100%'} display="flex" flexDirection={'column'} alignItems={'flex-start'} gap={'20px'} overflow={'auto'}>
                    {usePageProps.isGoogleCalendarLogin ? (
                        <>
                            {usePageProps.googleCalendar.isSuccess && usePageProps.googleCalendar.data.data.map((item, index) => {
                                return (
                                    <Box key={index} display="flex" flexDirection={'column'} gap={'25px'}
                                         alignItems={'center'}>
                                        <Box display="flex" flexDirection={'row'} gap={'30px'} alignItems={'center'}>
                                            <Typography
                                                color="#505050"
                                                fontSize="16px"
                                                fontWeight={600}
                                            >
                                                {DateTime.fromISO(item.start).toFormat("d")}
                                            </Typography>
                                            <Typography
                                                color="#505050"
                                                fontSize="14px"
                                                fontWeight={400}
                                            >{DateTime.fromISO(item.start).toFormat("MMM, EEE")}</Typography>

                                            <Box style={{
                                                height: 10,
                                                width: 10,
                                                backgroundColor: 'red',
                                                borderRadius: '100%'
                                            }}></Box>

                                            <Typography
                                                color="#505050"
                                                fontSize="16px"
                                                fontWeight={400}
                                            >
                                                {DateTime.fromISO(item.start).toFormat("hh:mma")} - {DateTime.fromISO(item.end).toFormat("hh:mma")}
                                            </Typography>

                                            <Typography
                                                color="#505050"
                                                fontSize="16px"
                                                fontWeight={700}
                                                ml={5}
                                            >
                                                {item.summary}
                                            </Typography>
                                        </Box>
                                        <Divider sx={{width: '100%'}}/>
                                    </Box>
                                )
                            })}
                        </>

                    ) : (
                        <Box display="flex" alignItems={'center'} height={'300px'} sx={{display: 'flex', alignSelf: 'flex-start', justifyContent: 'flex-start'}}>
                            {usePageProps.isLoadingCalendar ? (<CircularProgress size={40}/>) : (
                                <Button sx={{marginLeft:'50px'}} fullWidth disabled={usePageProps.isLoadingCalendar} onClick={() => usePageProps.handleGoogleCalendarLogin()}
                                        variant="contained">
                                    Mostrar el calendario de google
                                </Button>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};
