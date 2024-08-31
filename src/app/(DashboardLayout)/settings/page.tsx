'use client';
import { Box, CircularProgress, Grid } from '@mui/material';
import React from 'react';
import usePage from './usePage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableShared, {
  ColumnProps,
} from '@/common/components/UI/table/TableShared';
import MenuShared from '@/common/components/UI/menu/MenuShared';
import { GetPropertyFeaturesDto } from '@/common/dto';
import PageContainer from '../components/container/PageContainer';
import HeaderPage from '../components/shared/HeaderPage';
import {
  DialogCreateEditSettings,
  FeatureTypes,
} from './component/DialogCreateEditSettings';
import { DialogFreeDelete } from '@/common/components/Logic/DialogFreeDelete';

const User = () => {
  const usePageProps = usePage();

  const headCells: Array<ColumnProps<GetPropertyFeaturesDto & { id: number }>> =
    [
      {
        key: 'property_feature_id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
      },
      {
        key: 'description',
        numeric: false,
        disablePadding: true,
        label: 'Descripcción',
      },
      {
        key: 'type',
        numeric: false,
        disablePadding: true,
        label: 'Tipo',
        render: (_, record: GetPropertyFeaturesDto & { id: number }) =>
          FeatureTypes.find((feature) => feature.value === record.type)
            ?.label || '-',
      },
      {
        key: 'property_feature_id',
        numeric: false,
        disablePadding: false,
        label: 'Acciones',
        render: (_, record: GetPropertyFeaturesDto & { id: number }) => (
          <MenuShared
            actions={[
              {
                id: record.property_feature_id,
                icon: <EditIcon fontSize="small" />,
                label: 'Editar',
                onClick: () => usePageProps.handleClickEdit(record),
              },
              {
                id: record.property_feature_id,
                icon: <DeleteIcon fontSize="small" />,
                label: 'Borrar',
                onClick: () => usePageProps.handleClickDelete(record),
              },
            ]}
          />
        ),
      },
    ];

  return (
    <>
      <PageContainer title="Settings" description="este es el settings">
        <HeaderPage
          noBorder
          name="Características de proyectos y unidades"
          btnLabel="+ Nueva Características"
          onClick={() => usePageProps.setOpenCreateEditModal(true)}
        />
        <Box px={5}>
          {usePageProps.propertyFeatureList.isLoading ? (
            <Grid justifyContent={'center'} item xs={12}>
              <CircularProgress sx={{ color: '#000' }} />
            </Grid>
          ) : (
            usePageProps.propertyFeatureList.isSuccess && (
              <>
                <TableShared<GetPropertyFeaturesDto & { id: number }>
                  headTitle="Características"
                  headCells={headCells}
                  rowsPerPage={usePageProps.rowsPerPage}
                  changePageSize={usePageProps.changePageSize}
                  rows={usePageProps.propertyFeatureList.data.rows.map(
                    (user, indx) => ({
                      ...user,
                      id: user.property_feature_id,
                    })
                  )}
                  orderByValue="description"
                  page={usePageProps.page}
                  setPage={usePageProps.setPage}
                  count={usePageProps.propertyFeatureList.data.count}
                />
              </>
            )
          )}
        </Box>
      </PageContainer>

      <DialogCreateEditSettings
        isEdit={usePageProps.isEdit}
        open={usePageProps.openCreateEditModal}
        onClose={usePageProps.onCloseCreateEditModal}
        usePageProps={usePageProps}
      />

      <DialogFreeDelete
        open={usePageProps.openDeleteModal}
        onClose={usePageProps.onCloseDeleteModal}
        usePageProps={usePageProps}
      />
    </>
  );
};

export default User;
