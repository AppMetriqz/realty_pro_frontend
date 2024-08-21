'use client';
import { Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React from 'react';

const PaymentPlan = () => {
  return (
    <PageContainer title="Planes de pago" description="este es el plan de pago">
      <Box>Planes de pago</Box>
    </PageContainer>
  );
};

export default PaymentPlan;
