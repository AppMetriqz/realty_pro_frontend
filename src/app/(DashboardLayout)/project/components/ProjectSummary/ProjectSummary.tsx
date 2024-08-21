import { Box, CircularProgress, Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import UnitDetails from '../UnitDetails';
import useProjectSummary from './useProjectSummary';
import _ from 'lodash';
import { DialogCreate } from '../DialogCreate';
import { mapProjectToCardProperty } from '@/common/utils/project';
import { UseProjectPageProps } from '../../[slug]/usePage';
import { ProjectFormInput } from '../../core';

const ProjectSummary: FC<{
  useProjectPageProps: UseProjectPageProps;
}> = ({ useProjectPageProps }) => {
  const useProjectSummaryProps = useProjectSummary();

  useEffect(() => {
    if (
      !useProjectPageProps.findProject.isLoading &&
      useProjectPageProps.findProject.isSuccess
    ) {
      Object.keys(useProjectPageProps.findProject.data).map((key) =>
        useProjectSummaryProps.hookForm.setValue(
          key as keyof ProjectFormInput,
          useProjectPageProps.findProject.data[key]
        )
      );
    }
  }, [
    useProjectPageProps.findProject.isLoading,
    useProjectSummaryProps.showCreateEditProject,
  ]);

  return (
    <>
      <Box p={5}>
        {useProjectSummaryProps.findSummary.isLoading ? (
          <Grid justifyContent={'center'} item xs={12}>
            <CircularProgress sx={{ color: '#000' }} />
          </Grid>
        ) : (
          useProjectSummaryProps.findSummary.isSuccess && (
            <Grid container spacing={'40px'}>
              <UnitDetails
                typeOfUnit={'project'}
                editLabel="Editar Proyecto"
                onClickEdit={() =>
                  useProjectSummaryProps.setShowCreateEditProject(true)
                }
                property={mapProjectToCardProperty(
                  useProjectSummaryProps.findSummary.data
                )}
              />
            </Grid>
          )
        )}
      </Box>
      <DialogCreate
        isEdit
        usePageProps={useProjectSummaryProps}
        open={useProjectSummaryProps.showCreateEditProject}
        onClose={useProjectSummaryProps.onCloseCreateModal}
      />
    </>
  );
};

export default ProjectSummary;
