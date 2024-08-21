import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Data {
  [key: string]: {
    month: string;
    elCibao: number;
    lasAmericas: number;
    gregorioLuperon: number;
    samana: number;
  }[];
}

const AccessesConsumed = () => {
  const [selectedTab, setSelectedTab] = React.useState(6);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const theme = useTheme();
  const selectedColor = '#a01817';

  const data: Data = {
    '3': [
      {
        month: 'Abr',
        elCibao: 120,
        lasAmericas: 280,
        gregorioLuperon: 90,
        samana: 50,
      },
      {
        month: 'May',
        elCibao: 210,
        lasAmericas: 320,
        gregorioLuperon: 140,
        samana: 80,
      },
      {
        month: 'Jun',
        elCibao: 150,
        lasAmericas: 210,
        gregorioLuperon: 110,
        samana: 70,
      },
    ],
    '6': [
      {
        month: 'Ene',
        elCibao: 400,
        lasAmericas: 200,
        gregorioLuperon: 100,
        samana: 50,
      },
      {
        month: 'Feb',
        elCibao: 350,
        lasAmericas: 180,
        gregorioLuperon: 90,
        samana: 60,
      },
      {
        month: 'Mar',
        elCibao: 300,
        lasAmericas: 220,
        gregorioLuperon: 110,
        samana: 70,
      },
      {
        month: 'Abr',
        elCibao: 120,
        lasAmericas: 280,
        gregorioLuperon: 90,
        samana: 50,
      },
      {
        month: 'May',
        elCibao: 210,
        lasAmericas: 320,
        gregorioLuperon: 140,
        samana: 80,
      },
      {
        month: 'Jun',
        elCibao: 150,
        lasAmericas: 210,
        gregorioLuperon: 110,
        samana: 70,
      },
    ],
    '9': [
      {
        month: 'Oct',
        elCibao: 400,
        lasAmericas: 300,
        gregorioLuperon: 200,
        samana: 100,
      },
      {
        month: 'Nov',
        elCibao: 350,
        lasAmericas: 280,
        gregorioLuperon: 190,
        samana: 90,
      },
      {
        month: 'Dic',
        elCibao: 320,
        lasAmericas: 260,
        gregorioLuperon: 170,
        samana: 80,
      },
      {
        month: 'Ene',
        elCibao: 400,
        lasAmericas: 200,
        gregorioLuperon: 100,
        samana: 50,
      },
      {
        month: 'Feb',
        elCibao: 350,
        lasAmericas: 180,
        gregorioLuperon: 90,
        samana: 60,
      },
      {
        month: 'Mar',
        elCibao: 300,
        lasAmericas: 220,
        gregorioLuperon: 110,
        samana: 70,
      },
      {
        month: 'Abr',
        elCibao: 120,
        lasAmericas: 280,
        gregorioLuperon: 90,
        samana: 50,
      },
      {
        month: 'May',
        elCibao: 210,
        lasAmericas: 320,
        gregorioLuperon: 140,
        samana: 80,
      },
      {
        month: 'Jun',
        elCibao: 150,
        lasAmericas: 210,
        gregorioLuperon: 110,
        samana: 70,
      },
    ],
    '12': [
      {
        month: 'Jul',
        elCibao: 280,
        lasAmericas: 270,
        gregorioLuperon: 160,
        samana: 90,
      },
      {
        month: 'Ago',
        elCibao: 270,
        lasAmericas: 260,
        gregorioLuperon: 150,
        samana: 80,
      },
      {
        month: 'Sep',
        elCibao: 300,
        lasAmericas: 290,
        gregorioLuperon: 180,
        samana: 100,
      },
      {
        month: 'Oct',
        elCibao: 400,
        lasAmericas: 300,
        gregorioLuperon: 200,
        samana: 100,
      },
      {
        month: 'Nov',
        elCibao: 350,
        lasAmericas: 280,
        gregorioLuperon: 190,
        samana: 90,
      },
      {
        month: 'Dic',
        elCibao: 320,
        lasAmericas: 260,
        gregorioLuperon: 170,
        samana: 80,
      },
      {
        month: 'Ene',
        elCibao: 400,
        lasAmericas: 200,
        gregorioLuperon: 100,
        samana: 50,
      },
      {
        month: 'Feb',
        elCibao: 350,
        lasAmericas: 180,
        gregorioLuperon: 90,
        samana: 60,
      },
      {
        month: 'Mar',
        elCibao: 300,
        lasAmericas: 220,
        gregorioLuperon: 110,
        samana: 70,
      },
      {
        month: 'Abr',
        elCibao: 120,
        lasAmericas: 280,
        gregorioLuperon: 90,
        samana: 50,
      },
      {
        month: 'May',
        elCibao: 210,
        lasAmericas: 320,
        gregorioLuperon: 140,
        samana: 80,
      },
      {
        month: 'Jun',
        elCibao: 150,
        lasAmericas: 210,
        gregorioLuperon: 110,
        samana: 70,
      },
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
    colors: ['#33aaff', '#ED7D31', '#FFC000', '#70AD47'],
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
      name: 'El Cibao',
      data: data[selectedTab].map((d) => d.elCibao),
    },
    {
      name: 'Las Americas',
      data: data[selectedTab].map((d) => d.lasAmericas),
    },
    {
      name: 'Gregorio Luperón',
      data: data[selectedTab].map((d) => d.gregorioLuperon),
    },
    {
      name: 'Samaná',
      data: data[selectedTab].map((d) => d.samana),
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

export default AccessesConsumed;
