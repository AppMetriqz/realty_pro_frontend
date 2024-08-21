import CloseIcon from '@/icons/CloseIcon';
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React from 'react';
import usePage from './usePage';
import UnitDetails from '../UnitDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableShared, {
  ColumnProps,
} from '@/common/components/table/TableShared';
import SearchInput from '@/common/components/searchInput/SearchInput';

import MenuShared from '@/common/components/menu/MenuShared';
import { mapSellToSellTable, mapUnitToProperty } from '@/common/utils/unit';
import { DialogDelete } from '../DialogDelete';

export interface SellTableData {
  id: string | number;
  unitName: string;
  client: string;
  price: string;
  creationDate: string;
  stage: string;
  actions: string | number;
}

const ProjectSells = () => {
  const usePageProps = usePage();

  const headCells: Array<ColumnProps<SellTableData>> = [
    {
      key: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      key: 'unitName',
      numeric: false,
      disablePadding: true,
      label: 'Unidad',
    },
    {
      key: 'client',
      numeric: false,
      disablePadding: false,
      label: 'Cliente',
    },
    {
      key: 'price',
      numeric: false,
      disablePadding: false,
      label: 'Monto',
    },
    {
      key: 'creationDate',
      numeric: false,
      disablePadding: false,
      label: 'Fecha',
    },
    {
      key: 'stage',
      numeric: false,
      disablePadding: false,
      label: 'Etapa',
    },
    {
      key: 'actions',
      numeric: false,
      disablePadding: false,
      label: 'Acciones',
      render: (_, record: SellTableData) => (
        <div>
          <MenuShared
            actions={[
              {
                id: record.id,
                icon: <VisibilityIcon fontSize="small" />,
                label: 'Ver',
                onClick: () => usePageProps.handleClickView(record.id),
              },
              {
                id: record.id,
                icon: <DeleteIcon fontSize="small" />,
                label: 'Borrar',
                onClick: () => usePageProps.handleClickDelete(record.id),
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Box p={5}>
        {!!usePageProps.selectedUnitId &&
        !usePageProps.unitDetails.isLoading &&
        usePageProps.unitDetails.isSuccess &&
        usePageProps.showView ? (
          <>
            <Grid container columnSpacing={'40px'}>
              <UnitDetails
                typeOfUnit={usePageProps.unitDetails.data.type}
                onClickBack={usePageProps.goBack}
                property={mapUnitToProperty(usePageProps.unitDetails.data)}
              />
            </Grid>
          </>
        ) : usePageProps.availableSales.isLoading ? (
          <Grid justifyContent={'center'} item xs={12}>
            <CircularProgress sx={{ color: '#000' }} />
          </Grid>
        ) : (
          usePageProps.availableSales.isSuccess && (
            <>
              <Box display="flex" flexDirection={'column'}>
                <Box
                  display="flex"
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mb="40px"
                >
                  <Box
                    display="flex"
                    width={'80%'}
                    gap={'20px'}
                    alignItems={'center'}
                  >
                    <SearchInput
                      sx={{ maxWidth: '268px' }}
                      label="Buscar unidad"
                    />
                    <FormControl
                      sx={{
                        maxWidth: '222px',
                        '.MuiSelect-select': { padding: '13px 32px' },
                      }}
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-label">
                        Seleccionar Etapa
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={''}
                        label="Seleccionar Etapa"
                        onChange={usePageProps.onChangeSaleStage}
                      >
                        {usePageProps.currentSaleStages.map((stage) => (
                          <MenuItem key={stage.value} value={stage.value}>
                            {stage.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {usePageProps.selectedStages.map((stage) => (
                      <Chip
                        key={stage.value}
                        color="secondary"
                        label={stage.label}
                        deleteIcon={
                          <CloseIcon
                            onClick={() =>
                              usePageProps.handleDeleteStage(stage)
                            }
                          />
                        }
                        onDelete={() => usePageProps.handleDeleteStage(stage)}
                      />
                    ))}
                  </Box>
                  <Box display="flex" width={'20%'} justifyContent={'flex-end'}>
                    <Typography fontWeight={600}>
                      {usePageProps.availableSales.data.rows.length} Venta
                      {usePageProps.availableSales.data.rows.length > 1
                        ? ''
                        : 's'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <TableShared<SellTableData>
                headTitle="Ventas"
                headCells={headCells}
                rowsPerPage={usePageProps.rowsPerPage}
                changePageSize={usePageProps.changePageSize}
                rows={usePageProps.availableSales.data.rows.map(
                  mapSellToSellTable
                )}
                orderByValue="unitName"
                page={usePageProps.page}
                setPage={usePageProps.setPage}
              />
            </>
          )
        )}
      </Box>
      <DialogDelete
        open={usePageProps.openDeleteModal}
        onClose={usePageProps.onCloseDeleteModal}
        usePageProps={usePageProps}
        type={'Venta'}
        validationMessage="BORRAR VENTA"
        name={
          usePageProps.unitDetails.data
            ? usePageProps.unitDetails.data.name
            : ''
        }
      />
    </>
  );
};

export default ProjectSells;
