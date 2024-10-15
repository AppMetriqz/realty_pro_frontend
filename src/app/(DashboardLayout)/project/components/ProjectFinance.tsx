'use client';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { FC } from 'react';
import usePage, { UsePageProps } from '@/app/(DashboardLayout)/finance/usePage';
import { LineChart } from '@/app/(DashboardLayout)/components/chart/LineChart';
import { StageChart } from '@/app/(DashboardLayout)/components/chart/StageChart';
import { LineBarChart } from '@/app/(DashboardLayout)/components/chart/LineBarChart';
import { PieChart } from '@/app/(DashboardLayout)/components/chart/PieChart';
import { TableChart } from '@/app/(DashboardLayout)/components/chart/TableChart';
import { useParams } from 'next/navigation';
import _ from 'lodash';
import { CurrencyTypeDto } from '@/common/dto';

const ProjectFinance: FC<{ currency?: keyof typeof CurrencyTypeDto }> = ({
  currency,
}) => {
  const { slug } = useParams();
  const usePageProps: UsePageProps = usePage(_.toNumber(slug), currency);

  return (
    <>
      {usePageProps.finances.isSuccess ? (
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
    </>
  );
};

export default ProjectFinance;
