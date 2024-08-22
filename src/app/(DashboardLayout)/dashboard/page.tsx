'use client';
import {Box} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React from 'react';
import HeaderPage from "@/app/(DashboardLayout)/components/shared/HeaderPage";
import {Filters} from "@/app/(DashboardLayout)/finance/components/Filters";
import usePage, {UsePageProps} from "@/app/(DashboardLayout)/finance/usePage";


const Finance = () => {
    const usePageProps: UsePageProps = usePage();

    return (
        <PageContainer title="Escritorio" description="este es el escritorio">
            <HeaderPage name="Escritorio" extraContent={<Filters usePageProps={usePageProps}/>}/>

        </PageContainer>
    );
};

export default Finance;
