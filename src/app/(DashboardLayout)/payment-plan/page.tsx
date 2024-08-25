'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React from 'react';
import HeaderPage from "@/app/(DashboardLayout)/components/shared/HeaderPage";
import {Filters} from "@/app/(DashboardLayout)/payment-plan/components/Filters";
import usePage, {UsePageProps} from "@/app/(DashboardLayout)/payment-plan/usePage";


const PaymentPlan = () => {
    const usePageProps: UsePageProps = usePage();

    return (
        <PageContainer title="Planes de pagos" description="este es Planes de pagos">
            <HeaderPage name="Planes de pagos" extraContent={<Filters usePageProps={usePageProps}/>}/>


        </PageContainer>
    );
};

export default PaymentPlan;
