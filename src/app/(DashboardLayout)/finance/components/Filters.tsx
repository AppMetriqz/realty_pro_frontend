import React, { FC } from 'react';
import { Box, } from "@mui/material";
import { SelectChipShared } from "@/common/components/textField/SelectChipShared";
import { UsePageProps } from "@/app/(DashboardLayout)/finance/usePage";

 interface FiltersProps {
  usePageProps:UsePageProps
}

export const Filters  = ({ usePageProps }:FiltersProps) => {
  return (
    <>
      <Box
        display="flex"
        width={'80%'}
        gap={'20px'}
        alignItems={'center'}
      >
        <SelectChipShared
          keyId={"project_id"}
          keyName={"name"}
          placeholder={"Seleccionar Proyectos"}
          value={usePageProps.selectedProject}
          options={usePageProps.projects.isSuccess? usePageProps.projects.data : []}
          optionsSelected={usePageProps.selectedProjects}
          handleRemove={usePageProps.handleRemoveProjects}
          onInputChange={usePageProps.debouncedProjectText}
          onSelected={usePageProps.onSetSelectedProjects}
        />
      </Box>
    </>
  );
};
