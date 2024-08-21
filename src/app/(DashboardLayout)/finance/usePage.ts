import React, {Dispatch, SetStateAction, useState} from "react";
import {apiFinances, apiProjects} from '@/api';
import {FinancesDto, ProjectDto} from '@/common/dto';
import {SelectChangeEvent} from "@mui/material";
import {UseQueryResult} from "@tanstack/react-query";
import {useDebouncedCallback} from "use-debounce";
import _ from "lodash";
import {
    LineBarOptions,
    LineOptions,
    PieOptions,
    StageOptions
} from "@/app/(DashboardLayout)/components/chart/chartsOptions";
import {DateTime} from "luxon";

export type UsePageProps = {
    handleRemoveProjects?: (e: SelectChangeEvent) => void;
    onSetSelectedProjects?: Dispatch<SetStateAction<any>>
    projectText?: string
    selectedProject?: ProjectDto | null
    selectedProjects?: ProjectDto[]
    projects?: UseQueryResult<any, ProjectDto>;
    finances?: UseQueryResult<any, FinancesDto>;
    debouncedProjectText?: Dispatch<SetStateAction<string>>;
    lineOptions: any;
    stageOptions: any;
    lineBarOptions: any;
    pieOptions: any;
};

export default function usePage() {

    const [selectedProjects, setSelectedProjects] = useState<ProjectDto[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null);
    const [projectText, setProjectText] = useState<string>("");
    const [lineOptions, setLineOptions] = React.useState(LineOptions);
    const [stageOptions, setStageOptions] = React.useState(StageOptions);
    const [lineBarOptions, setLineBarOptions] = React.useState(LineBarOptions);
    const [pieOptions, setPieOptions] = React.useState(PieOptions);

    const projects = apiProjects.useFindAllAutocomplete({description: projectText});
    const finances = apiFinances.useFindAll({projectIds: _.join(_.map(selectedProjects, 'project_id'), ',')});


    React.useEffect(() => {
        if (finances.isSuccess) {
            const financesData = finances.data
            const lineData = finances.data.sales

            const seriesLine = [{
                showInLegend: false,
                data: _.map(lineData, "total")
            }]

            const xAxisLine = {
                categories: _.map(lineData, (item) => {
                    const monthName = DateTime.fromObject({month: item.month}).toFormat('LLLL');
                    return `${monthName} ${item.year}`
                })
            }

            const seriesStage = [
                {
                    lineWidth: 0,
                    name: 'Separaciones',
                    color: "#FFF1E6",
                    data: [financesData.stages.separations]
                },
                {
                    lineWidth: 0,
                    name: 'Planes de Pago en Proceso',
                    color: "#C2E6FA",
                    data: [financesData.stages.payment_plans_in_progress]
                },
                {
                    lineWidth: 0,
                    name: 'Planes de Pago Finalizado',
                    color: "#E0F5E7",
                    data: [financesData.stages.payment_plans_completed]
                },
                {
                    lineWidth: 0,
                    name: 'Financiado',
                    color: "#81E7AC",
                    data: [financesData.stages.financed]
                }
            ]

            const seriesLineBar = [
                {
                    showInLegend: false,
                    name: 'Capacidad Total',
                    data: [financesData.total_capacity],
                    color: "#E8E8E8",
                    zIndex: 3
                },
                {
                    showInLegend: false,
                    name: 'Pagos Pendiente',
                    data: [financesData.pending_payments],
                    color: "#C2E6FA",
                    zIndex: 2
                },
                {
                    showInLegend: false,
                    name: 'Pagos Recibidos',
                    data: [financesData.payments_received],
                    color: "#70E798",
                    zIndex: 1
                },
            ]


            const available_unit = financesData.status.available_unit?.amount ?? 0
            const sold_unit = financesData.status.sold_unit?.amount ?? 0
            const reserved_unit = financesData.status.reserved_unit?.amount ?? 0

            const seriesPie = [{
                name: 'pie',
                data: [
                    {name: 'Disponible', y: _.toNumber(available_unit), color: "#E7E7E7"},
                    {name: 'Vendido', y: _.toNumber(sold_unit), color: "#81E7AC"},
                    {name: 'Reservado', y: _.toNumber(reserved_unit), color: "#FFE4CF"}
                ]
            }]

            setLineOptions(prevState => ({...prevState, series: seriesLine, xAxis: xAxisLine}))
            setStageOptions(prevState => ({...prevState, series: seriesStage}))
            setLineBarOptions(prevState => ({...prevState, series: seriesLineBar}))
            setPieOptions(prevState => ({...prevState, series: seriesPie}))
        }
    }, [finances.isSuccess, finances.data])


    const handleRemoveProjects = (value: ProjectDto) => {
        setSelectedProjects(_.filter(selectedProjects, (item) => item.project_id !== value.project_id));
    };

    const onSetSelectedProjects = (value: ProjectDto) => {
        setSelectedProject(null)
        setSelectedProjects(_.uniqBy(_.concat(selectedProjects, [value]), 'project_id'))
    };

    const debouncedProjectText = useDebouncedCallback((value) => {
        setProjectText(value ?? '');
    }, 1000);

    return {
        handleRemoveProjects,
        projects,
        finances,
        lineOptions,
        stageOptions,
        lineBarOptions,
        pieOptions,
        projectText,
        selectedProjects,
        onSetSelectedProjects,
        debouncedProjectText,
        selectedProject,
    };
}
