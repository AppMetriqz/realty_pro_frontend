'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import React from 'react';
import HeaderPage from '../components/shared/HeaderPage';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import _ from 'lodash';
import SearchInput from '@/common/components/UI/searchInput/SearchInput';
import TableShared, {
  ColumnProps,
} from '@/common/components/UI/table/TableShared';
import useContactPage from './useContactPage';
import { ContactData } from '@/common/types/ContactType';
import { mapContactToTableRow } from '@/common/utils/contact';
import { GetContactDto } from '@/common/dto';
import { DialogCreateUpdateContact } from './components/DialogCreateUpdateContact';
import { Filters } from './components/Filters';
import HeaderSearch from '@/common/components/UI/headerSearch/HeaderSearch';
import usePermission from '@/common/hook/usePermission';

const Contact = () => {
  const { permissions } = usePermission();
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
  ];

  return (
    <>
      <PageContainer title="Contactos" description="este es contacto">
        <HeaderPage
          name="Contactos"
          btnLabel={permissions.contact.canAdd ? '+ Nuevo Contacto' : undefined}
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
          <HeaderSearch
            label="Contacto"
            onChange={usePageProps.onSetContactText}
            list={usePageProps.allContacts}
          />

          {usePageProps.allContacts.isLoading ? (
            <Grid justifyContent={'center'} item xs={12}>
              <CircularProgress sx={{ color: '#000' }} />
            </Grid>
          ) : (
            usePageProps.allContacts.isSuccess && (
              <>
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
                  onClickRow={(contact) =>
                    usePageProps.onClickContactView(contact.id)
                  }
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
