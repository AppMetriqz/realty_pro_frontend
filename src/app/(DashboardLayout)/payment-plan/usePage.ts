import React, {Dispatch, SetStateAction, useState} from 'react';
import {apiProjects, apiPaymentPlans} from '@/api';
import {CurrencyTypeDto, GetPaymentPlanDto, GetPaymentPlanStatDto, ProjectDto} from '@/common/dto';
import {UseQueryResult} from '@tanstack/react-query';
import {useDebouncedCallback} from 'use-debounce';
import _ from 'lodash';
import {useFindAllFinancing} from "@/api/payment-plans";


export interface UsePageProps {
    handleRemoveProjects: (value: ProjectDto) => void;
    onSetSelectedProjects: Dispatch<SetStateAction<any>>;
    projectText: string;
    selectedProject: ProjectDto | null;
    selectedProjects: ProjectDto[];
    projects: UseQueryResult<ProjectDto[], Error>;
    paymentPlanOverdue: UseQueryResult<{ count:number, rows:GetPaymentPlanDto[] }, Error>;
    paymentPlanPending: UseQueryResult<{ count:number, rows:GetPaymentPlanDto[] }, Error>;
    paymentPlanFinancing: UseQueryResult<{ count:number, rows:GetPaymentPlanDto[] }, Error>;
    paymentPlanStats: UseQueryResult<GetPaymentPlanStatDto, Error>;
    debouncedProjectText: Dispatch<SetStateAction<string>>;
    setPaymentPlanOverduePageIndex: Dispatch<SetStateAction<number>>;
    setPaymentPlanOverduePageSize: Dispatch<SetStateAction<number>>;
    setPaymentPlanPendingPageIndex: Dispatch<SetStateAction<number>>;
    setPaymentPlanPendingPageSize: Dispatch<SetStateAction<number>>;
    setPaymentPlanFinancingPageIndex: Dispatch<SetStateAction<number>>;
    setPaymentPlanFinancingPageSize: Dispatch<SetStateAction<number>>;
    paymentPlanOverduePageIndex: number;
    paymentPlanOverduePageSize: number;
    paymentPlanPendingPageIndex: number;
    paymentPlanPendingPageSize: number;
    paymentPlanFinancingPageIndex: number;
    paymentPlanFinancingPageSize: number;
    handleChangeCurrency: (e: React.ChangeEvent<HTMLInputElement>) => void;
    currency: string;
}

export default function usePage() {
    const [selectedProjects, setSelectedProjects] = useState<ProjectDto[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(
        null
    );

    const [currency, setCurrency] = React.useState<keyof typeof CurrencyTypeDto>('US');

    const [paymentPlanOverduePageIndex, setPaymentPlanOverduePageIndex] = useState<number>(0);
    const [paymentPlanOverduePageSize, setPaymentPlanOverduePageSize] = useState<number>(10);

    const [paymentPlanPendingPageIndex, setPaymentPlanPendingPageIndex] = useState<number>(0);
    const [paymentPlanPendingPageSize, setPaymentPlanPendingPageSize] = useState<number>(10);

    const [paymentPlanFinancingPageIndex, setPaymentPlanFinancingPageIndex] = useState<number>(0);
    const [paymentPlanFinancingPageSize, setPaymentPlanFinancingPageSize] = useState<number>(10);

    const [projectText, setProjectText] = useState<string>('');

    const projects = apiProjects.useFindAllAutocomplete({
        description: projectText,
        currencyType: currency,
    });

    const paymentPlanStats = apiPaymentPlans.useFindAllStats({
        projectIds: _.join(_.map(selectedProjects, 'project_id'), ','),
        currencyType: currency,
    });

    const paymentPlanOverdue  = apiPaymentPlans.useFindAll({
        pageIndex: paymentPlanOverduePageIndex,
        pageSize: paymentPlanOverduePageSize,
        planFilterStats:"overdue_payment",
        projectIds: _.join(_.map(selectedProjects, 'project_id'), ','),
        currencyType: currency,
    });

    const paymentPlanPending  = apiPaymentPlans.useFindAll({
        pageIndex: paymentPlanPendingPageIndex,
        pageSize: paymentPlanPendingPageSize,
        planFilterStats:"pending_payment",
        projectIds: _.join(_.map(selectedProjects, 'project_id'), ','),
        currencyType: currency,
    });

    const paymentPlanFinancing  = apiPaymentPlans.useFindAllFinancing({
        pageIndex: paymentPlanFinancingPageIndex,
        pageSize: paymentPlanFinancingPageSize,
        projectIds: _.join(_.map(selectedProjects, 'project_id'), ','),
        currencyType: currency,
    });

    const handleRemoveProjects = (value: ProjectDto) => {
        setSelectedProjects(
            _.filter(selectedProjects, (item) => item.project_id !== value.project_id)
        );
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

    const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const value = target.value as keyof typeof CurrencyTypeDto;

        setSelectedProjects([]);
        setCurrency(value);
    };

    return {
        handleRemoveProjects,
        projects,
        projectText,
        selectedProjects,
        onSetSelectedProjects,
        debouncedProjectText,
        selectedProject,
        paymentPlanStats,
        paymentPlanOverdue,
        paymentPlanPending,
        paymentPlanFinancing,
        setPaymentPlanOverduePageIndex,
        setPaymentPlanOverduePageSize,
        setPaymentPlanPendingPageIndex,
        setPaymentPlanPendingPageSize,
        setPaymentPlanFinancingPageIndex,
        setPaymentPlanFinancingPageSize,
        paymentPlanOverduePageIndex,
        paymentPlanOverduePageSize,
        paymentPlanPendingPageIndex,
        paymentPlanPendingPageSize,
        paymentPlanFinancingPageIndex,
        paymentPlanFinancingPageSize,
        handleChangeCurrency,
        currency,
    };
}
