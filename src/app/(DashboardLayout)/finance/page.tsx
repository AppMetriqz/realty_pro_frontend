'use client';
import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React, { useEffect } from 'react';
import HeaderPage from '@/app/(DashboardLayout)/components/shared/HeaderPage';
import { Filters } from '@/app/(DashboardLayout)/finance/components/Filters';
import usePage, { UsePageProps } from '@/app/(DashboardLayout)/finance/usePage';
import { LineChart } from '@/app/(DashboardLayout)/components/chart/LineChart';
import { StageChart } from '@/app/(DashboardLayout)/components/chart/StageChart';
import { LineBarChart } from '@/app/(DashboardLayout)/components/chart/LineBarChart';
import { PieChart } from '@/app/(DashboardLayout)/components/chart/PieChart';
import { TableChart } from '@/app/(DashboardLayout)/components/chart/TableChart';
import usePermission from '@/common/hook/usePermission';
import { useRouter } from 'next/navigation';
import routers from '@/common/constants/routes';
import { apiAuth } from '@/api';

const Finance = () => {
  const navigate = useRouter();
  const currentUser = apiAuth.useCurrentUser();
  const { permissions, isLoading } = usePermission(currentUser);
  const usePageProps: UsePageProps = usePage();

  useEffect(() => {
    if (!permissions.finance.canView) {
      navigate.push(routers.dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions.finance.canView]);

  return (
    <PageContainer title="Finanzas" description="este es fianzas">
      <HeaderPage
        name="Finanzas"
        extraContent={<Filters usePageProps={usePageProps} />}
      />
      {usePageProps.finances.isLoading || isLoading ? (
        <CircularProgress sx={{ color: '#000' }} />
      ) : !usePageProps.finances.isLoading &&
        !isLoading &&
        usePageProps.finances.isSuccess ? (
        <>
          <Box sx={{ borderBottom: '1px solid #E7E7E7' }}>
            <Box
              sx={{
                mx: '40px',
                my: '40px',
              }}
            >
              <LineBarChart usePageProps={usePageProps} />
            </Box>
          </Box>

          <Box sx={{ borderBottom: '1px solid #E7E7E7' }}>
            <Box
              sx={{
                mx: '40px',
                my: '40px',
              }}
            >
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="space-between"
              >
                <Grid xs={10} md={6}>
                  <StageChart usePageProps={usePageProps} />
                </Grid>
                <Grid xs={1} md={1}></Grid>
                <Grid xs={10} md={5}>
                  <LineChart usePageProps={usePageProps} />
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box sx={{ borderBottom: '1px solid #E7E7E7' }}>
            <Box
              sx={{
                mx: '40px',
                my: '40px',
              }}
            >
              <Box
                justifyContent="space-around"
                display={'flex'}
                alignItems="center"
              >
                <Box sx={{ width: '35%' }}>
                  <TableChart usePageProps={usePageProps} />
                </Box>
                <PieChart usePageProps={usePageProps} />
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>{/*TODO: Loading*/}</>
      )}
    </PageContainer>
  );
};

export default Finance;
