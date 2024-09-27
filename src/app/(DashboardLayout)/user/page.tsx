'use client';
import { Box, Chip, CircularProgress, Grid } from '@mui/material';
import React from 'react';
import usePage from './useUserPage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableShared, {
  ColumnProps,
} from '@/common/components/UI/table/TableShared';

import MenuShared from '@/common/components/UI/menu/MenuShared';
import { GetUserDto } from '@/common/dto';
import { DateTime } from 'luxon';
import { UserRoles } from '@/common/constants';
import PageContainer from '../components/container/PageContainer';
import HeaderPage from '../components/shared/HeaderPage';
import { DialogDelete } from '@/common/components/Logic/DialogDelete';
import { DialogCreateEditUser } from './component/DialogCreateEditUser';
import HeaderSearch from '@/common/components/UI/headerSearch/HeaderSearch';
import usePermission from '@/common/hook/usePermission';

const chipColor: {
  [key: number]:
    | 'success'
    | 'warning'
    | 'default'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'info';
} = {
  1: 'info',
  2: 'primary',
  3: 'default',
  4: 'error',
};

const User = () => {
  const { permissions } = usePermission();
  const usePageProps = usePage();
  let headCells: Array<ColumnProps<Partial<GetUserDto> & { id: number }>> = [
    {
      key: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      key: 'first_name',
      numeric: false,
      disablePadding: true,
      label: 'Nombre',
      render: (_: any, record: Partial<GetUserDto>) =>
        `${record.first_name} ${record.last_name}`,
    },
    {
      key: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Correo',
    },
    {
      key: 'national_id',
      numeric: false,
      disablePadding: false,
      label: 'Número de identidad',
      render: (_: any, record: Partial<GetUserDto>) =>
        record.national_id ? record.national_id : '-',
    },
    {
      key: 'role_id',
      numeric: false,
      disablePadding: false,
      label: 'Rol',
      render: (_: any, record: Partial<GetUserDto>) => (
        <Chip
          label={
            UserRoles.find((rol) => rol.value === record.role_id)?.label || ''
          }
          color={
            chipColor[
              (UserRoles.find((rol) => rol.value === record.role_id)
                ?.value as keyof typeof chipColor) || 3
            ]
          }
        />
      ),
    },
    {
      key: 'created_at',
      numeric: false,
      disablePadding: false,
      label: 'Fecha de creación',
      render: (_: any, record: Partial<GetUserDto>) =>
        DateTime.fromISO(record.created_at ?? '').toFormat('dd/LL/yyyy'),
    },
  ];

  if (permissions.user.canEdit) {
    headCells.push({
      key: 'id',
      numeric: false,
      disablePadding: false,
      label: 'Acciones',
      render: (_, record: Partial<GetUserDto> & { id: number }) =>
        record.role_id === 1 ? (
          <>-</>
        ) : (
          <MenuShared
            actions={[
              {
                id: record.id,
                icon: <EditIcon fontSize="small" />,
                label: 'Editar',
                onClick: () => usePageProps.handleClickEdit(record),
              },
              {
                id: record.id,
                icon: <DeleteIcon fontSize="small" />,
                label: 'Borrar',
                onClick: () =>
                  usePageProps.handleClickDelete(
                    record.id,
                    `${record.first_name} ${record.last_name}`
                  ),
              },
            ]}
          />
        ),
    });
  }

  return (
    <>
      <PageContainer title="Usuarios" description="este es Usuarios">
        <HeaderPage
          name="Usuarios"
          btnLabel={permissions.user.canAdd ? '+ Nuevo Usuario' : undefined}
          onClick={() => usePageProps.setOpenCreateEditModal(true)}
        />
        <Box p={5}>
          <HeaderSearch
            label="Usuario"
            onChange={usePageProps.onSetUserText}
            list={usePageProps.allUsers}
          />

          {usePageProps.allUsers.isLoading ? (
            <Grid justifyContent={'center'} item xs={12}>
              <CircularProgress sx={{ color: '#000' }} />
            </Grid>
          ) : (
            usePageProps.allUsers.isSuccess && (
              <>
                <TableShared<Partial<GetUserDto> & { id: number }>
                  headTitle="Usuarios"
                  headCells={headCells}
                  rowsPerPage={usePageProps.rowsPerPage}
                  changePageSize={usePageProps.changePageSize}
                  rows={usePageProps.allUsers.data.rows.map((user, indx) => ({
                    ...user,
                    id: user.user_id,
                  }))}
                  orderByValue="first_name"
                  page={usePageProps.page}
                  setPage={usePageProps.setPage}
                  count={usePageProps.allUsers.data.count}
                />
              </>
            )
          )}
        </Box>
      </PageContainer>
      <DialogDelete
        open={usePageProps.openDeleteModal}
        onClose={usePageProps.onCloseDeleteModal}
        usePageProps={usePageProps}
        type={'Usuario'}
        name={usePageProps.selectedUserToDelete?.userName || ''}
      />
      <DialogCreateEditUser
        isEdit={usePageProps.isEdit}
        open={usePageProps.openCreateEditModal}
        onClose={usePageProps.onCloseCreateEditModal}
        usePageProps={usePageProps}
      />
    </>
  );
};

export default User;
