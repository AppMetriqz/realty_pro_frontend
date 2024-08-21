'use client';
import { Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React from 'react';

const Dashboard = () => {
  return (
    <PageContainer title="Escritorio" description="este es el escritorio">
      <Box>Escritorio</Box>
    </PageContainer>
  );
};

export default Dashboard;
