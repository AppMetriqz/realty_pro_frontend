import React, { Dispatch, SetStateAction, useState } from 'react';
import { apiFinances, apiProjects } from '@/api';
import { CurrencyTypeDto, FinancesDto, ProjectDto } from '@/common/dto';
import { UseQueryResult } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import _ from 'lodash';
import {
  LineOptions,
  PieOptions,
} from '@/app/(DashboardLayout)/components/chart/chartsOptions';
import { DateTime } from 'luxon';

type LineOptionsDto = {
  color: string;
  name: string;
  value: number;
}[];

type LineBarOptionsDto = {
  total_capacity: number;
  pending_payments: number;
  payments_received: number;
};

export interface UsePageProps {
  handleRemoveProjects: (value: ProjectDto) => void;
  onSetSelectedProjects: Dispatch<SetStateAction<any>>;
  projectText: string;
  currency: string;
  selectedProject: ProjectDto | null;
  selectedProjects: ProjectDto[];
  projects: UseQueryResult<ProjectDto[], Error>;
  finances: UseQueryResult<FinancesDto, Error>;
  debouncedProjectText: Dispatch<SetStateAction<string>>;
  handleChangeCurrency: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lineOptions: any;
  pieOptions: any;
  stageOptions: LineOptionsDto;
  lineBarOptions: LineBarOptionsDto;
}

export default function usePage(project_id?: number) {
  const [selectedProjects, setSelectedProjects] = useState<ProjectDto[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(
    null
  );
  const [projectText, setProjectText] = useState<string>('');
  const [lineOptions, setLineOptions] = React.useState<any>(LineOptions);
  const [stageOptions, setStageOptions] = React.useState<
    LineOptionsDto | never[]
  >([]);
  const [lineBarOptions, setLineBarOptions] = React.useState<LineBarOptionsDto>(
    {
      total_capacity: 0,
      pending_payments: 0,
      payments_received: 0,
    }
  );
  const [pieOptions, setPieOptions] = React.useState<any>(PieOptions);
  const [currency, setCurrency] =
    React.useState<keyof typeof CurrencyTypeDto>('US');

  const projects = apiProjects.useFindAllAutocomplete({
    description: projectText,
    currencyType: currency,
  });
  const finances = apiFinances.useFindAll({
    projectIds: _.join(_.map(selectedProjects, 'project_id'), ','),
  });

  React.useEffect(() => {
    if (project_id) {
      let project = { project_id } as ProjectDto;
      setSelectedProjects(
        _.uniqBy(_.concat(selectedProjects, [project]), 'project_id')
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project_id]);

  React.useEffect(() => {
    if (finances.isSuccess) {
      const financesData = finances.data;
      const lineData = finances.data.sales;

      const seriesLine = [
        {
          showInLegend: false,
          data: _.map(lineData, 'total'),
        },
      ];

      const xAxisLine = {
        categories: _.map(lineData, (item) => {
          const monthName = DateTime.fromObject({ month: item.month }).toFormat(
            'LLLL',
            { locale: 'es' }
          );
          return `${monthName} ${item.year}`;
        }),
      };

      const seriesStage = [
        {
          color: '#FFF1E6',
          name: 'Separaciones',
          value: financesData.stages.separations,
        },
        {
          color: '#C2E6FA',
          name: 'Planes de Pago en Proceso',
          value: financesData.stages.payment_plans_in_progress,
        },
        {
          color: '#E0F5E7',
          name: 'Planes de Pago Finalizado',
          value: financesData.stages.payment_plans_completed,
        },
        {
          color: '#81E7AC',
          name: 'Financiado',
          value: financesData.stages.financed,
        },
      ];

      const seriesLineBar = {
        total_capacity: financesData.total_capacity,
        pending_payments: financesData.pending_payments,
        payments_received: financesData.payments_received,
      };

      const available_unit = financesData.status.available_unit?.amount ?? 0;
      const sold_unit = financesData.status.sold_unit?.amount ?? 0;
      const reserved_unit = financesData.status.reserved_unit?.amount ?? 0;

      const seriesPie = [
        {
          name: 'pie',
          data: [
            {
              name: 'Disponible',
              y: _.toNumber(available_unit),
              color: '#E7E7E7',
            },
            { name: 'Vendido', y: _.toNumber(sold_unit), color: '#81E7AC' },
            {
              name: 'Reservado',
              y: _.toNumber(reserved_unit),
              color: '#FFE4CF',
            },
          ],
        },
      ];

      setLineBarOptions(seriesLineBar);
      setStageOptions(seriesStage);
      setLineOptions((prevState: any) => ({
        ...prevState,
        series: seriesLine,
        xAxis: xAxisLine,
      }));
      setPieOptions((prevState: any) => ({ ...prevState, series: seriesPie }));
    }
  }, [finances.isSuccess, finances.data]);

  const handleRemoveProjects = (value: ProjectDto) => {
    setSelectedProjects(
      _.filter(selectedProjects, (item) => item.project_id !== value.project_id)
    );
  };

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value as keyof typeof CurrencyTypeDto;

    setSelectedProjects([]);
    setCurrency(value);
  };

  const onSetSelectedProjects = (value: ProjectDto) => {
    setSelectedProject(null);
    setSelectedProjects(
      _.uniqBy(_.concat(selectedProjects, [value]), 'project_id')
    );
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
    currency,
    handleChangeCurrency,
  };
}
