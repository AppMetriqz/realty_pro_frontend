'use client';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React from 'react';
import HeaderPage from '@/app/(DashboardLayout)/components/shared/HeaderPage';
import usePage, {
  UsePageProps,
} from '@/app/(DashboardLayout)/dashboard/usePage';
import { LineChart } from '@/app/(DashboardLayout)/components/chart/LineChart';
import { GoogleCalendar } from '@/app/(DashboardLayout)/dashboard/components/GoogleCalendar';
import TableShared, {
  ColumnProps,
} from '@/common/components/UI/table/TableShared';
import {
  assignBtnStyle,
  mapPaymentPlansToAssignTable,
  mapSalesToAssignTable,
  PaymentPlansToAssignTableDto,
  SalesToAssignTableDto,
} from '@/app/(DashboardLayout)/dashboard/core';
import { DialogCreateSell } from '@/common/components/Logic/DialogCreateSell';
import { GetSellDto } from '@/common/dto';
import { DateTime } from 'luxon';
import { formatCurrency } from '@/common/utils/numericHelpers';

const Dashboard = () => {
  const usePageProps: UsePageProps = usePage();

  const HeadCellsPaymentPlansToAssign: Array<
    ColumnProps<PaymentPlansToAssignTableDto>
  > = [
    {
      key: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      key: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Fecha',
    },
    {
      key: 'project',
      numeric: false,
      disablePadding: true,
      label: 'Proyecto',
    },
    {
      key: 'unit',
      numeric: false,
      disablePadding: false,
      label: 'Unidad',
    },
    {
      key: 'client',
      numeric: false,
      disablePadding: false,
      label: 'Cliente',
    },
    {
      key: 'actions',
      numeric: false,
      disablePadding: false,
      label: 'Acciones',
      render: (_, record: PaymentPlansToAssignTableDto) => (
        <Button variant="text" sx={assignBtnStyle}>
          Asignar
        </Button>
      ),
    },
  ];

  const HeadCellsSalesToAssign: Array<
    ColumnProps<Partial<GetSellDto> & { id: number }>
  > = [
    {
      key: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
      render: (_, record: Partial<GetSellDto>) => record.sale_id ?? 0,
    },
    {
      key: 'created_at',
      numeric: false,
      disablePadding: true,
      label: 'Fecha',
      render: (_, record: Partial<GetSellDto>) =>
        DateTime.fromISO(record.created_at ?? '').toLocaleString(),
    },
    {
      key: 'project',
      numeric: false,
      disablePadding: true,
      label: 'Proyecto',
      render: (_, record: Partial<GetSellDto>) => record.project?.name || '',
    },
    {
      key: 'unit',
      numeric: false,
      disablePadding: false,
      label: 'Unidad',
      render: (_, record: Partial<GetSellDto>) => record.unit?.name || '',
    },
    {
      key: 'price',
      numeric: false,
      disablePadding: false,
      label: 'Monto',
      render: (_, record: Partial<GetSellDto>) =>
        formatCurrency(parseFloat(record.price ?? '0')),
    },
    {
      key: 'updated_at',
      numeric: false,
      disablePadding: false,
      label: 'Cliente',
      render: (_, record: Partial<GetSellDto> & { id: number }) => (
        <Button
          variant="text"
          sx={assignBtnStyle}
          onClick={() => usePageProps.onClickAssignSell(record)}
        >
          Asignar
        </Button>
      ),
    },
  ];

  return (
    <PageContainer title="Escritorio" description="este es el escritorio">
      <HeaderPage name="Escritorio" noBorder />
      <Box sx={{ borderBottom: '1px solid #E7E7E7' }}>
        <Box
          sx={{
            mx: '80px',
            mb: '40px',
          }}
        >
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="space-between"
          >
            <Grid xs={10} md={6}>
              <GoogleCalendar usePageProps={usePageProps} />
            </Grid>
            <Grid xs={10} md={6}>
              <LineChart usePageProps={usePageProps} />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ mx: '60px', mt: '40px' }}>
        <TableShared<Partial<GetSellDto> & { id: number }>
          headTitle="Ventas Por Asignar"
          headCells={HeadCellsSalesToAssign}
          count={
            usePageProps.salesToAssign.isSuccess
              ? usePageProps.salesToAssign.data.count
              : 0
          }
          rows={
            usePageProps.salesToAssign.isSuccess
              ? usePageProps.salesToAssign.data.rows.map((sale) => ({
                  ...sale,
                  id: sale.sale_id,
                }))
              : []
          }
          orderByValue="unit"
          rowsPerPage={usePageProps.salesToAssignPageSize}
          changePageSize={usePageProps.setSalesToAssignPageSize}
          page={usePageProps.salesToAssignPageIndex}
          setPage={usePageProps.setSalesToAssignPageIndex}
        />
      </Box>

      <Box sx={{ mx: '60px', my: '100px' }}>
        <TableShared<PaymentPlansToAssignTableDto>
          headTitle="Planes de Pago Por Asignar"
          headCells={HeadCellsPaymentPlansToAssign}
          count={
            usePageProps.paymentPlansToAssign.isSuccess
              ? usePageProps.paymentPlansToAssign.data.count
              : 0
          }
          rows={
            usePageProps.paymentPlansToAssign.isSuccess
              ? usePageProps.paymentPlansToAssign.data.rows.map(
                  mapPaymentPlansToAssignTable
                )
              : []
          }
          orderByValue="project"
          rowsPerPage={usePageProps.paymentPlansToAssignPageSize}
          changePageSize={usePageProps.setPaymentPlansToAssignPageSize}
          page={usePageProps.paymentPlansToAssignPageIndex}
          setPage={usePageProps.setPaymentPlansToAssignPageIndex}
        />
      </Box>
      <DialogCreateSell
        isEdit
        open={usePageProps.openSellModal}
        onClose={usePageProps.onCloseSellModal}
        usePageProps={usePageProps}
      />
    </PageContainer>
  );
};

export default Dashboard;
