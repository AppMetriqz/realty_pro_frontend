'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React, { useEffect } from 'react';
import HeaderPage from '../components/shared/HeaderPage';
import { Box, CircularProgress, Grid } from '@mui/material';
import PropertyCard from '../components/shared/PropertyCard';
import { DialogCreate } from './components/DialogCreate';
import usePage from './usePage';
import _ from 'lodash';
import { ProjectDto } from '@/common/dto';
import { mapProjectToProperty } from '@/common/utils/project';
import SearchInput from '@/common/components/UI/searchInput/SearchInput';
import usePermission from '@/common/hook/usePermission';
import routers from '@/common/constants/routes';
import { useRouter } from 'next/navigation';
import { apiAuth } from '@/api';

const Project = () => {
  const navigate = useRouter();
  const currentUser = apiAuth.useCurrentUser();
  const { permissions } = usePermission(currentUser);
  const usePageProps = usePage();

  useEffect(() => {
    if (!permissions.project.canView) {
      navigate.push(routers.dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions.project.canView]);

  return (
    <>
      <PageContainer title="Proyectos" description="este es Proyectos">
        <HeaderPage
          name="Proyectos"
          btnLabel={permissions.project.canAdd ? '+ Nuevo Proyecto' : undefined}
          onClick={() => usePageProps.setShowCreateProject(true)}
        />
        <Box
          sx={{
            m: '40px',
          }}
          display={'flex'}
          flexDirection={'column'}
        >
          <Box sx={{ width: { md: '20%' } }}>
            <SearchInput
              label="Buscar Proyecto"
              onChange={usePageProps.onSetProjectText}
            />
          </Box>

          <Grid mt={'40px'} container spacing={2.5}>
            {usePageProps.listProps.findAllProject.isLoading ? (
              <Grid justifyContent={'center'} item xs={12}>
                <CircularProgress sx={{ color: '#000' }} />
              </Grid>
            ) : usePageProps.listProps.findAllProject.isSuccess &&
              usePageProps.listProps.findAllProject.data.length ? (
              _.map(
                usePageProps.listProps.findAllProject.data,
                (project: ProjectDto) => (
                  <Grid item xs={6} md={4} key={project.project_id}>
                    <PropertyCard
                      typeOfUnit="project"
                      property={mapProjectToProperty(project)}
                    />
                  </Grid>
                )
              )
            ) : (
              <>Sin Resultados.</>
            )}
          </Grid>
        </Box>
      </PageContainer>
      <DialogCreate
        usePageProps={usePageProps}
        open={usePageProps.showCreateProject}
        onClose={usePageProps.onCloseCreateProjectModal}
      />
    </>
  );
};

export default Project;
