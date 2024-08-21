import React from 'react';
import { Select, MenuItem, Tabs, Tab, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalesOverview = () => {
  const [selectedTab, setSelectedTab] = React.useState(6);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const selectedColor = '#a01817';

  // chart
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
    colors: ['#33aaff', '#55cc55', '#ffaa33'],
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
      // lineCap: "butt",
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
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart: any = [
    {
      name: 'Disponibles al inicio del mes',
      data: [600, 500, 300, 300, 300, 400],
    },
    {
      name: 'Consumidos durante el mes',
      data: [100, 200, 100, 150, 100, 200],
    },
    {
      name: 'Restantes al cierre de mes',
      data: [500, 300, 200, 150, 200, 200],
    },
  ];

  return (
    <DashboardCard title="Balance de accesos">
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
          series={seriescolumnchart}
          type="bar"
          height={370}
          width={'100%'}
        />
      </>
    </DashboardCard>
  );
};

export default SalesOverview;
