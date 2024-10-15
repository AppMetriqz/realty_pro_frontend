'use client';
import React, { useEffect } from 'react';
import PageContainer from '../../components/container/PageContainer';
import HeaderPage from '../../components/shared/HeaderPage';
import { DialogCreateUnit } from '../components/DialogCreateUnit';
import usePage from './usePage';
import ProjectTab from '../components/ProjectTab';
import ProjectSummary from '../components/ProjectSummary/ProjectSummary';
import ProjectSells from '../components/ProjectSells/ProjectSells';
import ProjectFinance from '../components/ProjectFinance';
import ProjectAvailable from '../components/ProjectAvailable/ProjectAvailable';
import { useRouter } from 'next/navigation';
import routers from '@/common/constants/routes';
import { CircularProgress, Grid } from '@mui/material';

const ProjectResumen = () => {
  const router = useRouter();
  const usePageProps = usePage();

  useEffect(() => {
    if (
      !usePageProps.findProject.isLoading &&
      usePageProps.findProject.isSuccess
    ) {
      usePageProps.hookForm.setValue(
        'type',
        usePageProps.findProject.data.type
      );
      usePageProps.hookForm.setValue(
        'project_id',
        usePageProps.findProject.data.project_id!
      );
    }

    if (usePageProps.findProject.isError) {
      router.push(routers.project);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    usePageProps.findProject.isLoading,
    usePageProps.findProject.isError,
    usePageProps.showCreateUnit,
  ]);

  const projectSections = [
    {
      label: 'Resumen',
      id: 'summary',
      component: <ProjectSummary useProjectPageProps={usePageProps} />,
    },
    {
      label: 'Ventas',
      id: 'sells',
      component: <ProjectSells />,
    },
    {
      label: 'Finanzas',
      id: 'finance',
      component: (
        <ProjectFinance
          currency={usePageProps.findProject.data?.currency_type}
        />
      ),
    },
    {
      label: 'Disponibilidad',
      id: 'available',
      component: <ProjectAvailable useProjectPageProps={usePageProps} />,
    },
  ];

  return usePageProps.findProject.isLoading ? (
    <Grid justifyContent={'center'} item xs={12}>
      <CircularProgress sx={{ color: '#000' }} />
    </Grid>
  ) : (
    <>
      <PageContainer
        title={usePageProps.findProject.data?.name || ''}
        description="este es Alto de las Aromas"
      >
        <HeaderPage
          name={usePageProps.findProject.data?.name || ''}
          btnLabel="+ Nueva Unidad"
          onClick={() => usePageProps.setShowCreateUnit(true)}
          extraContent={
            <ProjectTab
              currentTabValue={usePageProps.currentTabValue}
              handleChange={usePageProps.handleChangeTab}
              tabArray={projectSections}
            />
          }
        />
        {projectSections[usePageProps.currentTabValue].component}
      </PageContainer>
      <DialogCreateUnit
        usePageProps={usePageProps}
        open={usePageProps.showCreateUnit}
        onClose={usePageProps.onCloseCreateUnitModal}
        isStatusDisabled={false}
      />
    </>
  );
};

export default ProjectResumen;
