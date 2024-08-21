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

const ProjectResumen = () => {
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
        usePageProps.findProject.data.project_id
      );
    }
  }, [usePageProps.findProject.isLoading, usePageProps.showCreateUnit]);

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
      component: <ProjectFinance />,
    },
    {
      label: 'Disponibilidad',
      id: 'available',
      component: <ProjectAvailable useProjectPageProps={usePageProps} />,
    },
  ];

  return (
    <>
      <PageContainer
        title="Alto de las Aromas"
        description="este es Alto de las Aromas"
      >
        <HeaderPage
          name="Alto de las Aromas"
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
      />
    </>
  );
};

export default ProjectResumen;
