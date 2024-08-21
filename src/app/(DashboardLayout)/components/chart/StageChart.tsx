import React from 'react';
import {Box,} from "@mui/material";
import {UsePageProps} from "@/app/(DashboardLayout)/finance/usePage";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

interface FiltersProps {
    usePageProps: UsePageProps
}

export const StageChart = ({usePageProps}: FiltersProps) => {
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={usePageProps.stageOptions}
        />
    );
};
