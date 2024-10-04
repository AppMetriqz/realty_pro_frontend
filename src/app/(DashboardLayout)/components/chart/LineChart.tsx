import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';

interface FiltersProps {
  usePageProps: any;
}

export const LineChart = ({ usePageProps }: FiltersProps) => {
  if (typeof window !== `undefined`) {
    highchartsAccessibility(Highcharts);
  }

  const options = {
    ...usePageProps.lineOptions,
    accessibility: {
      enabled: true, // Enable accessibility features
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
