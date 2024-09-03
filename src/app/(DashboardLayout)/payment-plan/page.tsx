'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React from 'react';
import HeaderPage from '@/app/(DashboardLayout)/components/shared/HeaderPage';
import { Filters } from '@/app/(DashboardLayout)/payment-plan/components/Filters';
import usePage, {
  UsePageProps,
} from '@/app/(DashboardLayout)/payment-plan/usePage';
import { Box } from '@mui/material';
import TableShared from '@/common/components/UI/table/TableShared';
import {
  HeadCellsPaymentPlan,
  HeadCellsPaymentPlanFinancing,
} from '@/app/(DashboardLayout)/payment-plan/core';
import { GetPaymentPlanDto } from '@/common/dto';
import { Status } from '@/app/(DashboardLayout)/payment-plan/components/Status';
import { PaymentPlanType } from '@/common/constants';
import _ from 'lodash';

const PaymentPlan = () => {
  const usePageProps: UsePageProps = usePage();

  return (
    <PageContainer
      title="Planes de pagos"
      description="este es Planes de pagos"
    >
      <HeaderPage
        name="Planes de pagos"
        extraContent={<Filters usePageProps={usePageProps} />}
      />

      <Status usePageProps={usePageProps} />

      <Box sx={{ mx: '60px', mt: '40px' }}>
        <TableShared<
          Partial<GetPaymentPlanDto> & {
            id: number;
            phone_number_1: string;
            sale_type: string;
          }
        >
          headTitle="Pagos Atrasados"
          headCells={HeadCellsPaymentPlan}
          count={
            usePageProps.paymentPlanOverdue.isSuccess
              ? usePageProps.paymentPlanOverdue.data.count
              : 0
          }
          rows={
            usePageProps.paymentPlanOverdue.isSuccess
              ? usePageProps.paymentPlanOverdue.data.rows.map((items) => ({
                  ...items,
                  id: items.sale_id,
                  phone_number_1: items.client.phone_number_1,
                  sale_type:
                    PaymentPlanType.find(
                      (p) => p.value === items.payment_plan.sale_type
                    )?.label ?? '',
                }))
              : []
          }
          orderByValue="created_at"
          rowsPerPage={usePageProps.paymentPlanOverduePageSize}
          changePageSize={usePageProps.setPaymentPlanOverduePageSize}
          page={usePageProps.paymentPlanOverduePageIndex}
          setPage={usePageProps.setPaymentPlanOverduePageIndex}
        />
      </Box>

      <Box sx={{ mx: '60px', mt: '40px' }}>
        <TableShared<
          Partial<GetPaymentPlanDto> & {
            id: number;
            phone_number_1: string;
            sale_type: string;
          }
        >
          headTitle="Pagos Pendientes"
          headCells={HeadCellsPaymentPlan}
          count={
            usePageProps.paymentPlanPending.isSuccess
              ? usePageProps.paymentPlanPending.data.count
              : 0
          }
          rows={
            usePageProps.paymentPlanPending.isSuccess
              ? usePageProps.paymentPlanPending.data.rows.map((items) => ({
                  ...items,
                  id: items.sale_id,
                  phone_number_1: items.client.phone_number_1 || '-',
                  sale_type:
                    _.find(PaymentPlanType, {
                      value: items.payment_plan.sale_type,
                    })?.label ?? '',
                }))
              : []
          }
          orderByValue="created_at"
          rowsPerPage={usePageProps.paymentPlanPendingPageSize}
          changePageSize={usePageProps.setPaymentPlanPendingPageSize}
          page={usePageProps.paymentPlanPendingPageIndex}
          setPage={usePageProps.setPaymentPlanPendingPageIndex}
        />
      </Box>

      <Box sx={{ mx: '60px', my: '40px' }}>
        <TableShared<
          Partial<GetPaymentPlanDto> & {
            id: number;
            phone_number_1: string;
            sale_type: string;
          }
        >
          headTitle="Para Financiamiento"
          headCells={HeadCellsPaymentPlanFinancing}
          count={
            usePageProps.paymentPlanFinancing.isSuccess
              ? usePageProps.paymentPlanFinancing.data.count
              : 0
          }
          rows={
            usePageProps.paymentPlanFinancing.isSuccess
              ? usePageProps.paymentPlanFinancing.data.rows.map((items) => ({
                  ...items,
                  id: items.sale_id,
                  phone_number_1: items.client.phone_number_1,
                  sale_type:
                    _.find(PaymentPlanType, { value: items.sale_type })
                      ?.label ?? '',
                }))
              : []
          }
          orderByValue="created_at"
          rowsPerPage={usePageProps.paymentPlanFinancingPageSize}
          changePageSize={usePageProps.setPaymentPlanFinancingPageSize}
          page={usePageProps.paymentPlanFinancingPageIndex}
          setPage={usePageProps.setPaymentPlanFinancingPageIndex}
        />
      </Box>
    </PageContainer>
  );
};

export default PaymentPlan;
