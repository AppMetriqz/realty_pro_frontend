import CloseIcon from '@/icons/CloseIcon';
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import usePage, { AvailableTableData, UpdateUnitProjectProps } from './usePage';
import UnitDetails from '../UnitDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import SellIcon from '@mui/icons-material/Sell';
import TableShared, {
  ColumnProps,
} from '@/common/components/UI/table/TableShared';
import SearchInput from '@/common/components/UI/searchInput/SearchInput';

import MenuShared, { ActionType } from '@/common/components/UI/menu/MenuShared';
import {
  mapUnitToAvailableTable,
  mapUnitToProperty,
} from '@/common/utils/unit';
import { DialogDelete } from '../DialogDelete';
import { DialogCreateSell } from '../../../../../common/components/Logic/DialogCreateSell';
import { DialogCreateUnit } from '../DialogCreateUnit';
import { UnitFormInput } from '../../[slug]/core';
import { DialogEditMultipleUnit } from '../DialogEditMultipleUnit';
import { UseProjectPageProps } from '../../[slug]/usePage';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';
import { DialogCancelSell } from '../DialogCancelSell';

const ProjectAvailable: FC<{
  useProjectPageProps: UseProjectPageProps;
}> = ({ useProjectPageProps }) => {
  const usePageProps = usePage();
  const isPlot =
    useProjectPageProps.findProject.data &&
    useProjectPageProps.findProject.data.type === 'plot';

  useEffect(() => {
    if (
      !useProjectPageProps.findProject.isLoading &&
      useProjectPageProps.findProject.isSuccess
    ) {
      usePageProps.multipleUnitHookForm.setValue(
        'type',
        useProjectPageProps.findProject.data.type
      );
      usePageProps.hookForm.setValue(
        'type',
        useProjectPageProps.findProject.data.type
      );
    }
  }, [
    useProjectPageProps.findProject.isLoading,
    usePageProps.showView,
    usePageProps.openEditMultipleUnitModal,
  ]);

  useEffect(() => {
    if (
      !usePageProps.unitDetails.isLoading &&
      usePageProps.unitDetails.isSuccess
    ) {
      Object.keys(usePageProps.unitDetails.data).map((key) => {
        usePageProps.hookForm.setValue(
          key as keyof UnitFormInput,
          (usePageProps.unitDetails.data as any)[key]
        );
      });
    }
  }, [usePageProps.unitDetails.isLoading, usePageProps.openEditOneUnitModal]);

  const actionList = (
    isSold: boolean,
    record: AvailableTableData
  ): ActionType[] => {
    const actionArray = [
      {
        id: record.id,
        icon: <VisibilityIcon fontSize="small" />,
        label: 'Ver',
        onClick: () => usePageProps.handleClickView(record.id),
      },
      {
        id: record.id,
        icon: isSold ? (
          <DoDisturbOffIcon fontSize="small" />
        ) : (
          <SellIcon fontSize="small" />
        ),
        label: isSold ? 'Cancelar Venta' : 'Vender',
        onClick: isSold
          ? () => usePageProps.handleClickCancelSale(record.id)
          : () => usePageProps.handleClickSell(record.id),
      },
    ];
    if (!isSold) {
      actionArray.push.apply(actionArray, [
        {
          id: record.id,
          icon: <EditIcon fontSize="small" />,
          label: 'Editar',
          onClick: () => usePageProps.handleClickEdit(record.id),
        },
        {
          id: record.id,
          icon: <DeleteIcon fontSize="small" />,
          label: 'Borrar',
          onClick: () => usePageProps.handleClickDelete(record.id),
        },
      ]);
    }
    return actionArray;
  };

  const headCells: Array<ColumnProps<AvailableTableData>> = [
    {
      key: 'id',
      numeric: false,
      disablePadding: true,
      label: '',
      isCheckbox: true,
      render: (
        _,
        record: AvailableTableData,
        isItemSelected: boolean,
        handleClick?: (
          event: React.MouseEvent<unknown>,
          item: AvailableTableData
        ) => void
      ) => (
        <Checkbox
          key={`checkbox-${record.id}`}
          color="primary"
          onClick={(event) => handleClick?.(event, record)}
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': `enhanced-table-checkbox-${record.id}`,
          }}
        />
      ),
    },
    {
      key: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Unidad',
    },
    {
      key: 'meters_of_land',
      numeric: false,
      disablePadding: false,
      label: isPlot ? 'Metraje' : 'Metrajes de terreno',
    },
    isPlot
      ? {
          key: 'price_per_meter',
          numeric: false,
          disablePadding: false,
          label: 'Precio por Metro',
        }
      : ({} as ColumnProps<AvailableTableData>),
    {
      key: 'price',
      numeric: false,
      disablePadding: false,
      label: 'Precio',
    },
    {
      key: 'condition',
      numeric: false,
      disablePadding: false,
      label: 'Condición',
    },
    {
      key: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Estatus',
    },
    {
      key: 'actions',
      numeric: false,
      disablePadding: false,
      label: 'Acciones',
      render: (_, record: AvailableTableData) => {
        const isSold = record.status === 'Vendido';
        return (
          <div>
            <MenuShared
              actions={actionList(isSold, record)}
              isDisabled={usePageProps.selectedUnits.length > 1}
            />
          </div>
        );
      },
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
                editLabel={
                  usePageProps.unitDetails.data.status !== 'sold'
                    ? 'Editar Unidad'
                    : undefined
                }
                onClickDelete={() => {
                  if (usePageProps.unitDetails.data) {
                    usePageProps.handleClickDelete(
                      usePageProps.unitDetails.data.unit_id
                    );
                  }
                }}
                onClickEdit={usePageProps.onClickEditUnitFromView}
                deleteLabel={
                  usePageProps.unitDetails.data.status !== 'sold'
                    ? 'Borrar Unidad'
                    : undefined
                }
                onClickBack={usePageProps.goBack}
                property={mapUnitToProperty(
                  usePageProps.unitDetails.data,
                  useProjectPageProps.findProject.data?.currency_type
                )}
              />
            </Grid>
          </>
        ) : usePageProps.availableUnits.isLoading ? (
          <Grid justifyContent={'center'} item xs={12}>
            <CircularProgress sx={{ color: '#000' }} />
          </Grid>
        ) : (
          usePageProps.availableUnits.isSuccess && (
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
                      onChange={usePageProps.onSetUnitText}
                    />
                    <FormControl
                      sx={{
                        maxWidth: '222px',
                        '.MuiSelect-select': { padding: '13px 32px' },
                      }}
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-label">
                        Seleccionar Estatus
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={''}
                        label="Seleccionar Estatus"
                        onChange={usePageProps.onChangeStatus}
                      >
                        {usePageProps.currentUnitStatuses.map((status) => (
                          <MenuItem key={status.value} value={status.value}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {usePageProps.selectedStatuses.map((status) => (
                      <Chip
                        key={status.value}
                        color="secondary"
                        label={status.label}
                        deleteIcon={
                          <CloseIcon
                            onClick={() =>
                              usePageProps.handleDeleteStatus(status)
                            }
                          />
                        }
                        onDelete={() => usePageProps.handleDeleteStatus(status)}
                      />
                    ))}
                  </Box>
                  <Box display="flex" width={'20%'} justifyContent={'flex-end'}>
                    <Typography fontWeight={600}>
                      {usePageProps.availableUnits.data.rows.length} Unidad
                      {usePageProps.availableUnits.data.rows.length > 1
                        ? 'es'
                        : ''}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <TableShared<AvailableTableData>
                headTitle="Unidades disponibles"
                headCells={headCells}
                selected={usePageProps.selectedUnits}
                setSelected={usePageProps.setSelectedUnits}
                rowsPerPage={usePageProps.rowsPerPage}
                changePageSize={usePageProps.changePageSize}
                multiSelectActions={
                  <>
                    <Tooltip title="Vender">
                      <IconButton
                        onClick={usePageProps.onClickSaleMultipleUnits}
                      >
                        <SellIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton
                        onClick={usePageProps.onClickEditMultipleUnits}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        onClick={usePageProps.onClickDeleteMultipleUnits}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                }
                rows={usePageProps.availableUnits.data.rows.map(
                  mapUnitToAvailableTable
                )}
                count={usePageProps.availableUnits.data.count}
                orderByValue="name"
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
        type={usePageProps.selectedUnits.length ? 'Unidades' : 'Unidad'}
        validationMessage="BORRAR UNIDAD"
        name={
          usePageProps.unitDetails.data
            ? usePageProps.unitDetails.data.name
            : ''
        }
      />
      <DialogCreateSell
        open={usePageProps.openSellModal}
        onClose={usePageProps.onCloseSellModal}
        usePageProps={usePageProps}
      />
      <DialogCreateUnit<UpdateUnitProjectProps>
        isEdit
        usePageProps={usePageProps}
        open={usePageProps.openEditOneUnitModal}
        onClose={usePageProps.onCloseEditOneUnitModal}
        isStatusDisabled={usePageProps.unitDetails.data?.status === 'sold'}
      />
      <DialogEditMultipleUnit<AvailableTableData>
        selectedUnits={usePageProps.selectedUnits}
        usePageProps={usePageProps}
        open={usePageProps.openEditMultipleUnitModal}
        onClose={usePageProps.onCloseEditMultipleUnitModal}
        hasError={usePageProps.multipleUpdateHasError}
        setMultipleUpdateHasError={usePageProps.setMultipleUpdateHasError}
      />
      <DialogCancelSell
        open={usePageProps.openCancelSellModal}
        onClose={usePageProps.onCloseCancelSellModal}
        usePageProps={usePageProps}
        name={
          usePageProps.unitDetails.data
            ? usePageProps.unitDetails.data.name
            : ''
        }
      />
    </>
  );
};

export default ProjectAvailable;
