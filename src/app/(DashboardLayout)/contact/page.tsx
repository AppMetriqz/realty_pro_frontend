'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React from 'react';
import HeaderPage from '../components/shared/HeaderPage';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import _ from 'lodash';
import SearchInput from '@/common/components/searchInput/SearchInput';
import TableShared, {
  ColumnProps,
} from '@/common/components/table/TableShared';
import useContactPage from './useContactPage';
import MenuShared from '@/common/components/menu/MenuShared';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContactData } from '@/common/types/ContactType';
import { mapContactToTableRow } from '@/common/utils/contact';
import { GetContactDto } from '@/common/dto';
import { DialogCreateUpdateContact } from './components/DialogCreateUpdateContact';
import { Filters } from './components/Filters';

const Contact = () => {
  const usePageProps = useContactPage();
  const headCells: Array<ColumnProps<ContactData>> = [
    {
      key: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      key: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Nombre',
    },
    {
      key: 'type',
      numeric: false,
      disablePadding: false,
      label: 'Tipo de Contacto',
    },
    {
      key: 'phone',
      numeric: false,
      disablePadding: false,
      label: 'Telefono',
    },
    {
      key: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
    {
      key: 'created_at',
      numeric: false,
      disablePadding: false,
      label: 'Creación',
    },
    {
      key: 'actions',
      numeric: false,
      disablePadding: false,
      label: 'Acciones',
      render: (_, record: ContactData) => (
        <div>
          <MenuShared
            actions={[
              {
                id: record.id,
                icon: <VisibilityIcon fontSize="small" />,
                label: 'Ver',
                onClick: () => usePageProps.onClickContactView(record.id),
              },
              {
                id: record.id,
                icon: <DeleteIcon fontSize="small" />,
                label: 'Borrar',
                onClick: () => {},
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageContainer title="Contactos" description="este es contacto">
        <HeaderPage
          name="Contactos"
          btnLabel="+ Nuevo Contacto"
          onClick={() => usePageProps.setOpenCreateEditContact(true)}
          extraContent={<Filters usePageProps={usePageProps} />}
        />
        <Box
          sx={{
            m: '40px',
          }}
          display={'flex'}
          flexDirection={'column'}
        >
          {usePageProps.allContacts.isLoading ? (
            <Grid justifyContent={'center'} item xs={12}>
              <CircularProgress sx={{ color: '#000' }} />
            </Grid>
          ) : (
            usePageProps.allContacts.isSuccess && (
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
                      width={'100%'}
                      gap={'20px'}
                      alignItems={'center'}
                    >
                      <SearchInput
                        sx={{ maxWidth: '268px' }}
                        label="Buscar Contacto"
                      />
                    </Box>
                    <Box
                      display="flex"
                      width={'20%'}
                      justifyContent={'flex-end'}
                    >
                      <Typography fontWeight={600}>
                        {usePageProps.allContacts.data.rows.length} Contacto
                        {usePageProps.allContacts.data.rows.length > 1
                          ? ''
                          : 's'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <TableShared<ContactData>
                  headTitle="Contactos disponibles"
                  headCells={headCells}
                  rowsPerPage={usePageProps.rowsPerPage}
                  changePageSize={usePageProps.changePageSize}
                  rows={usePageProps.allContacts.data.rows.map(
                    (contact: GetContactDto) => mapContactToTableRow(contact)
                  )}
                  orderByValue="name"
                  page={usePageProps.page}
                  setPage={usePageProps.setPage}
                  count={usePageProps.allContacts.data.count}
                />
              </>
            )
          )}
        </Box>
      </PageContainer>
      <DialogCreateUpdateContact
        open={usePageProps.openCreateEditContact}
        onClose={usePageProps.onCloseCreateEditContact}
        usePageProps={usePageProps}
      />
    </>
  );
};

export default Contact;
