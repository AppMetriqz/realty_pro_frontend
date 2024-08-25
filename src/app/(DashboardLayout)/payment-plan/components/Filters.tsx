import React, { FC, ReactNode } from 'react';
import { Box, Chip } from '@mui/material';
import { UsePageProps } from '@/app/(DashboardLayout)/payment-plan/usePage';
import { AutoCompleteSharedController } from '@/common/components/UI/textField/AutoCompleteShared';
import CloseIcon from '@/icons/CloseIcon';

interface FiltersProps {
  usePageProps: UsePageProps;
}

const keyId = 'project_id';
const keyName = 'name';

export const Filters = ({ usePageProps }: FiltersProps) => {
  return (
    <>
      <Box
        display="flex"
        // flexDirection={'column'}
        width={'80%'}
        gap={'20px'}
        alignItems={'center'}
      >
        <Box
          display="flex"
          flexDirection={'column'}
          // width={240}
          ml={'40px'}
          mb={'40px'}
          gap={'20px'}
          alignItems={'center'}
        >
          <Box
            display="flex"
            flexDirection={'row'}
            alignItems={'center'}
            gap={'50px'}
          >
            <AutoCompleteSharedController
              keyId={keyId}
              keyName={keyName}
              placeholder={'Seleccionar Proyectos'}
              disableClearable={false}
              isNotValue={true}
              onInputChange={usePageProps.debouncedProjectText}
              onSelected={usePageProps.onSetSelectedProjects}
              options={usePageProps.projects.isSuccess ? usePageProps.projects.data : []}
              labelStyle={{ mb: '15px' }}
              style={{ width: 240 }}
            />
          </Box>

          <Box
            display="flex"
            width={'100%'}
            mt={'40px'}
            gap={'10px'}
            alignItems={'center'}
          >
            {usePageProps.selectedProjects.map((option) => (
              <Chip
                key={option[keyId]}
                color="secondary"
                label={option[keyName]}
                deleteIcon={
                  <CloseIcon
                    onClick={() => usePageProps.handleRemoveProjects(option)}
                  />
                }
                onDelete={() => usePageProps.handleRemoveProjects(option)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
