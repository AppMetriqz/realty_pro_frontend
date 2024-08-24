import React from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import CloseIcon from '@/icons/CloseIcon';
import { UseContactPageProps } from '../useContactPage';

interface FiltersProps {
  usePageProps: UseContactPageProps;
}

export const Filters = ({ usePageProps }: FiltersProps) => {
  return (
    <>
      <Box display="flex" width={'80%'} gap={'20px'} alignItems={'center'}>
        <Box
          display="flex"
          flexDirection={'column'}
          ml={'40px'}
          mb={'40px'}
          gap={'20px'}
          alignItems={'flex-start'}
        >
          <Box
            display="flex"
            flexDirection={'row'}
            alignItems={'flex-start'}
            gap={'50px'}
          >
            <FormControl
              sx={{
                width: '300px',
                '.MuiSelect-select': { padding: '13px 32px' },
              }}
              fullWidth
            >
              <InputLabel id="demo-simple-select-label">
                Seleccionar Etiqueta
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={''}
                label="Seleccionar Estatus"
                onChange={usePageProps.onChangeContactType}
                fullWidth
              >
                {usePageProps.currentContactTypes.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            display="flex"
            width={'100%'}
            mt={'40px'}
            gap={'10px'}
            alignItems={'flex-start'}
          >
            {usePageProps.selectedContactTypes.map((contactType) => (
              <Chip
                key={contactType.value}
                color="secondary"
                label={contactType.label}
                deleteIcon={
                  <CloseIcon
                    onClick={() =>
                      usePageProps.handleDeleteContactType(contactType)
                    }
                  />
                }
                onDelete={() =>
                  usePageProps.handleDeleteContactType(contactType)
                }
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
