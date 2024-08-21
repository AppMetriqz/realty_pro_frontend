import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Data {
  [key: string]: { month: string; used: number }[];
}

const AccessesUsed = () => {
  const [selectedTab, setSelectedTab] = React.useState(6);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const theme = useTheme();
  const selectedColor = '#a01817';

  const data: Data = {
    3: [
      { month: 'Abr', used: 220 },
      { month: 'May', used: 310 },
      { month: 'Jun', used: 190 },
    ],
    6: [
      { month: 'Ene', used: 420 },
      { month: 'Feb', used: 150 },
      { month: 'Mar', used: 320 },
      { month: 'Abr', used: 220 },
      { month: 'May', used: 310 },
      { month: 'Jun', used: 190 },
    ],
    9: [
      { month: 'Oct', used: 400 },
      { month: 'Nov', used: 300 },
      { month: 'Dic', used: 350 },
      { month: 'Ene', used: 420 },
      { month: 'Feb', used: 150 },
      { month: 'Mar', used: 320 },
      { month: 'Abr', used: 220 },
      { month: 'May', used: 310 },
      { month: 'Jun', used: 190 },
    ],
    12: [
      { month: 'Jul', used: 280 },
      { month: 'Ago', used: 270 },
      { month: 'Sep', used: 300 },
      { month: 'Oct', used: 400 },
      { month: 'Nov', used: 300 },
      { month: 'Dic', used: 350 },
      { month: 'Ene', used: 420 },
      { month: 'Feb', used: 150 },
      { month: 'Mar', used: 320 },
      { month: 'Abr', used: 220 },
      { month: 'May', used: 310 },
      { month: 'Jun', used: 190 },
    ],
  };

  const optionscolumnchart: any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 370,
    },
    colors: ['#55cc55'],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: 5,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: data[selectedTab].map((d) => d.month),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: 'light',
      fillSeriesColor: false,
    },
  };
  const seriesColumnChart: any = [
    {
      name: 'Accesos utilizados',
      data: data[selectedTab].map((d) => d.used),
    },
  ];

  return (
    <DashboardCard title="Accesos utilizados">
      <>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered={false}
            sx={{
              '& .MuiTabs-flexContainer': {
                gap: '8px',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 0,
                minHeight: 0,
                padding: '6px 16px',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '4px',
                '&.Mui-selected': {
                  backgroundColor: 'transparent',
                  borderColor: selectedColor,
                  color: selectedColor,
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            <Tab label="3 meses" value={3} />
            <Tab label="6 meses" value={6} />
            <Tab label="9 meses" value={9} />
            <Tab label="1 año" value={12} />
          </Tabs>
        </Box>
        <Chart
          options={optionscolumnchart}
          series={seriesColumnChart}
          type="bar"
          height={370}
          width={'100%'}
        />
      </>
    </DashboardCard>
  );
};

export default AccessesUsed;
