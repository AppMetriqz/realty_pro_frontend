import React from 'react';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

interface FiltersProps {
    usePageProps: any
}

export const LineChart = ({usePageProps}: FiltersProps) => {

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={usePageProps.lineOptions}
        />
    );
};
