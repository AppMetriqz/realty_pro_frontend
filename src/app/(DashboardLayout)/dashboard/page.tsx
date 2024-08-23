'use client';
import {Box} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React from 'react';
import HeaderPage from "@/app/(DashboardLayout)/components/shared/HeaderPage";
import usePage, {UsePageProps} from "@/app/(DashboardLayout)/dashboard/usePage";
import {LineChart} from "@/app/(DashboardLayout)/components/chart/LineChart";
import {GoogleCalendar} from "@/app/(DashboardLayout)/dashboard/components/GoogleCalendar";
import TableShared from "@/common/components/table/TableShared";
import {
    HeadCellsPaymentPlansToAssign,
    HeadCellsSalesToAssign,
    mapPaymentPlansToAssignTable,
    mapSalesToAssignTable, PaymentPlansToAssignDto,
    SalesToAssignDto
} from "@/app/(DashboardLayout)/dashboard/core";


const Dashboard = () => {
    const usePageProps: UsePageProps = usePage();

    return (
        <PageContainer title="Escritorio" description="este es el escritorio">
            <HeaderPage name="Escritorio" noBorder/>
            <Box sx={{borderBottom: '1px solid #E7E7E7'}}>
                <Box
                    sx={{
                        mx: '80px',
                        mb: '40px',
                    }}
                >
                    <Grid container spacing={3} direction="row" justifyContent="space-between">
                        <Grid xs={10} md={6}>
                            <GoogleCalendar usePageProps={usePageProps}/>
                        </Grid>
                        <Grid xs={10} md={6}>
                            <LineChart usePageProps={usePageProps}/>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box sx={{mx: '60px', mt: '40px'}}>
                <TableShared<SalesToAssignDto>
                    headTitle="Ventas Por Asignar"
                    headCells={HeadCellsSalesToAssign}
                    count={usePageProps.salesToAssign.isSuccess ? usePageProps.salesToAssign.data.count : 0}
                    rows={usePageProps.salesToAssign.isSuccess ? usePageProps.salesToAssign.data.rows.map(mapSalesToAssignTable) : []}
                    orderByValue="unit"
                    rowsPerPage={usePageProps.salesToAssignPageSize}
                    changePageSize={usePageProps.setSalesToAssignPageSize}

                    page={usePageProps.salesToAssignPageIndex}
                    setPage={usePageProps.setSalesToAssignPageIndex}
                />
            </Box>

            <Box sx={{mx: '60px', my: '100px'}}>
                <TableShared<PaymentPlansToAssignDto>
                    headTitle="Planes de Pago Por Asignar"
                    headCells={HeadCellsPaymentPlansToAssign}
                    count={usePageProps.paymentPlansToAssign.isSuccess ? usePageProps.paymentPlansToAssign.data.count : 0}
                    rows={usePageProps.paymentPlansToAssign.isSuccess ? usePageProps.paymentPlansToAssign.data.rows.map(mapPaymentPlansToAssignTable) : []}
                    orderByValue="project"
                    rowsPerPage={usePageProps.paymentPlansToAssignPageSize}
                    changePageSize={usePageProps.setPaymentPlansToAssignPageSize}
                    page={usePageProps.paymentPlansToAssignPageIndex}
                    setPage={usePageProps.setPaymentPlansToAssignPageIndex}
                />
            </Box>
        </PageContainer>
    );
};

export default Dashboard;
