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
import { assignBtnStyle } from '@/app/(DashboardLayout)/dashboard/core';
import { DialogCreateSell } from '@/common/components/Logic/DialogCreateSell';
import { GetSellDto, PaymentPlanToAssignDto } from '@/common/dto';
import { DateTime } from 'luxon';
import { formatCurrency } from '@/common/utils/numericHelpers';
import { DialogCreatePaymentPlan } from '@/common/components/Logic/DialogCreatePaymentPlan';
import usePermission from '@/common/hook/usePermission';

const Dashboard = () => {
  const { permissions } = usePermission();
  const usePageProps: UsePageProps = usePage();

  const HeadCellsPaymentPlansToAssign: Array<
    ColumnProps<Partial<PaymentPlanToAssignDto> & { id: number }>
  > = [
    {
      key: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
      render: (_, record) => record.sale_id ?? 0,
    },
    {
      key: 'created_at',
      numeric: false,
      disablePadding: true,
      label: 'Fecha',
      render: (_, record) =>
        record.created_at
          ? DateTime.fromISO(record.created_at).toFormat('dd/LL/yyyy')
          : '-',
    },
    {
      key: 'project',
      numeric: false,
      disablePadding: true,
      label: 'Proyecto',
      render: (_, record) => (record.project ? record.project.name : '-'),
    },
    {
      key: 'unit',
      numeric: false,
      disablePadding: false,
      label: 'Unidad',
      render: (_, record) => (record.unit ? record.unit.name : '-'),
    },
    {
      key: 'client',
      numeric: false,
      disablePadding: false,
      label: 'Cliente',
      render: (_, record) =>
        record.client
          ? `${record.client.first_name} ${record.client.last_name}`
          : '-',
    },
  ];

  if (permissions.dashboard.canAssignPaymentPlan) {
    HeadCellsPaymentPlansToAssign.push({
      key: 'created_at',
      numeric: false,
      disablePadding: false,
      label: 'Acciones',
      render: (_, record) => (
        <Button
          variant="text"
          sx={assignBtnStyle}
          onClick={() => usePageProps.onClickPaymentPlan(record)}
        >
          Asignar
        </Button>
      ),
    });
  }

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
        record.created_at
          ? DateTime.fromISO(record.created_at).toFormat('dd/LL/yyyy')
          : '-',
    },
    {
      key: 'project',
      numeric: false,
      disablePadding: true,
      label: 'Proyecto',
      render: (_, record: Partial<GetSellDto>) => record.project?.name || '-',
    },
    {
      key: 'unit',
      numeric: false,
      disablePadding: false,
      label: 'Unidad',
      render: (_, record: Partial<GetSellDto>) => record.unit?.name || '-',
    },
    {
      key: 'price',
      numeric: false,
      disablePadding: false,
      label: 'Monto',
      render: (_, record: Partial<GetSellDto>) =>
        record.price ? formatCurrency(parseFloat(record.price)) : '0',
    },
  ];

  if (permissions.dashboard.canAssignSales) {
    HeadCellsSalesToAssign.push({
      key: 'created_at',
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
    });
  }

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
          orderByValue="created_at"
          rowsPerPage={usePageProps.salesToAssignPageSize}
          changePageSize={usePageProps.changeSaleToAssignPageSize}
          page={usePageProps.salesToAssignPageIndex}
          setPage={usePageProps.setSalesToAssignPageIndex}
        />
      </Box>

      <Box sx={{ mx: '60px', my: '100px' }}>
        <TableShared<Partial<PaymentPlanToAssignDto> & { id: number }>
          headTitle="Planes de Pago Por Asignar"
          headCells={HeadCellsPaymentPlansToAssign}
          count={
            usePageProps.paymentPlansToAssign.isSuccess
              ? usePageProps.paymentPlansToAssign.data.count
              : 0
          }
          rows={
            usePageProps.paymentPlansToAssign.isSuccess
              ? usePageProps.paymentPlansToAssign.data.rows.map((plan) => ({
                  ...plan,
                  id: plan.sale_id,
                  client: {
                    ...plan.client,
                    name: `${plan.client.first_name} ${plan.client.last_name}`,
                  },
                }))
              : []
          }
          orderByValue="project"
          rowsPerPage={usePageProps.paymentPlansToAssignPageSize}
          changePageSize={usePageProps.changePaymentPlansToAssignPageSize}
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
      <DialogCreatePaymentPlan
        open={usePageProps.openCreatePaymentPlanModal}
        onClose={usePageProps.onCloseCreatePaymentPlanModal}
        usePageProps={usePageProps}
      />
    </PageContainer>
  );
};

export default Dashboard;
