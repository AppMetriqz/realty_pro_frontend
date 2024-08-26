import CloseIcon from '@/icons/CloseIcon';
import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import usePage from './usePage';
import UnitDetails from '../UnitDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableShared, {
  ColumnProps,
} from '@/common/components/UI/table/TableShared';
import SearchInput from '@/common/components/UI/searchInput/SearchInput';

import MenuShared from '@/common/components/UI/menu/MenuShared';
import { mapUnitToProperty } from '@/common/utils/unit';
import { DialogDelete } from '../DialogDelete';
import { GetSellDto } from '@/common/dto';
import routers from '@/common/constants/routes';
import { formatCurrency } from '@/common/utils/numericHelpers';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { SaleStages } from '@/common/constants';

const mapSellToSellTable = (sell: GetSellDto): SellTableData => {
  return {
    id: sell.sale_id,
    unitName: sell.unit.name,
    client:
      sell.client.contact_id !== 1 ? (
        <Link href={`${routers.contact}/${sell.client.contact_id}`}>
          {sell.client.first_name} {sell.client.last_name}
        </Link>
      ) : (
        <>
          {sell.client.first_name} {sell.client.last_name}
        </>
      ),
    price: formatCurrency(parseFloat(sell.price) || 0),
    creationDate: DateTime.fromISO(sell.created_at).toLocaleString(),
    stage: SaleStages.find((stage) => stage.value === sell.stage)?.label ?? '',
    actions: sell.unit.unit_id,
  };
};

export interface SellTableData {
  id: string | number;
  unitName: string;
  client: ReactElement;
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
        <MenuShared
          actions={[
            {
              id: record.id,
              icon: <VisibilityIcon fontSize="small" />,
              label: 'Ver',
              onClick: () => usePageProps.handleClickView(record.actions),
            },
            {
              id: record.id,
              icon: <DeleteIcon fontSize="small" />,
              label: 'Borrar',
              onClick: () =>
                usePageProps.handleClickDelete(record.id, record.unitName),
            },
          ]}
        />
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
                property={mapUnitToProperty(
                  usePageProps.unitDetails.data,
                  usePageProps.unitDetails.data?.project.currency_type
                )}
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
                count={usePageProps.availableSales.data.count}
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
          usePageProps.selectedSaleToDelete?.unitName
            ? usePageProps.selectedSaleToDelete.unitName
            : ''
        }
      />
    </>
  );
};

export default ProjectSells;
