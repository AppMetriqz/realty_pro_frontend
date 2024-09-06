'use client';
import { Box, Chip, CircularProgress, Grid, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import usePage from './useUserPage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import TableShared, {
  ColumnProps,
} from '@/common/components/UI/table/TableShared';
import SearchInput from '@/common/components/UI/searchInput/SearchInput';

import MenuShared from '@/common/components/UI/menu/MenuShared';
import { GetUserDto } from '@/common/dto';
import { DateTime } from 'luxon';
import { UserRoles } from '@/common/constants';
import PageContainer from '../components/container/PageContainer';
import HeaderPage from '../components/shared/HeaderPage';
import { DialogDelete } from '@/common/components/Logic/DialogDelete';
import { DialogCreateEditUser } from './component/DialogCreateEditUser';

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

export interface SellTableData {
  id: string | number;
  unitName: string;
  client: ReactElement;
  price: string;
  creationDate: string;
  stage: string;
  actions: string | number;
}

const User = () => {
  const usePageProps = usePage();

  const headCells: Array<ColumnProps<Partial<GetUserDto> & { id: number }>> = [
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
      render: (_, record: Partial<GetUserDto>) =>
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
      render: (_, record: Partial<GetUserDto>) =>
        record.national_id ? record.national_id : '-',
    },
    {
      key: 'role_id',
      numeric: false,
      disablePadding: false,
      label: 'Rol',
      render: (_, record: Partial<GetUserDto>) => (
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
      render: (_, record: Partial<GetUserDto>) =>
        DateTime.fromISO(record.created_at ?? '').toFormat('dd/LL/yyyy'),
    },
    {
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
    },
  ];

  return (
    <>
      <PageContainer title="Usuarios" description="este es Usuarios">
        <HeaderPage
          name="Usuarios"
          btnLabel="+ Nuevo Usuario"
          onClick={() => usePageProps.setOpenCreateEditModal(true)}
        />
        <Box p={5}>
          {usePageProps.allUsers.isLoading ? (
            <Grid justifyContent={'center'} item xs={12}>
              <CircularProgress sx={{ color: '#000' }} />
            </Grid>
          ) : (
            usePageProps.allUsers.isSuccess && (
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
                        label="Buscar usuario"
                        onChange={usePageProps.onSetUserText}
                      />
                    </Box>
                    <Box
                      display="flex"
                      width={'20%'}
                      justifyContent={'flex-end'}
                    >
                      <Typography fontWeight={600}>
                        {usePageProps.allUsers.data.rows.length} Usuario
                        {usePageProps.allUsers.data.rows.length > 1 ? '' : 's'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
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
