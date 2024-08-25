'use client';
import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import SidebarContactInformation from './components/SidebarContactInformation';
import HeaderPage from '../../components/shared/HeaderPage';
import ProjectTab from '../../project/components/ProjectTab';
import useContactProfilePage from './usePage';
import SaleTab from './components/SaleTab';
import FinalizedTab from './components/FinalizedTab';
import { DialogCreateUpdateContact } from '../components/DialogCreateUpdateContact';
import { ContactFormInput } from '../core';
import { DateTime } from 'luxon';

const ContactProfile = () => {
  const useContactProfilePageProps = useContactProfilePage();

  useEffect(() => {
    if (
      !useContactProfilePageProps.findContact.isLoading &&
      useContactProfilePageProps.findContact.isSuccess
    ) {
      Object.keys(useContactProfilePageProps.findContact.data).map((key) => {
        if (
          key === 'date_of_birth' &&
          useContactProfilePageProps.findContact.data?.date_of_birth
        ) {
          useContactProfilePageProps.contactHookForm.setValue(
            'date_of_birth',
            DateTime.fromISO(
              useContactProfilePageProps.findContact.data?.date_of_birth
            ).toISODate() ?? ''
          );
        } else if (key === 'spouse') {
          useContactProfilePageProps.contactHookForm.setValue(
            'spouse_id',
            useContactProfilePageProps.findContact.data?.spouse?.contact_id
          );
          useContactProfilePageProps.setContactDescription(
            `${useContactProfilePageProps.findContact.data?.spouse?.first_name} ${useContactProfilePageProps.findContact.data?.spouse?.last_name}`
          );
        } else {
          useContactProfilePageProps.contactHookForm.setValue(
            key as keyof ContactFormInput,
            (useContactProfilePageProps.findContact.data as any)[key] ??
              undefined
          );
        }
      });
    }
  }, [useContactProfilePageProps.findContact.isLoading]);

  const userSections = [
    {
      label: 'Ventas',
      id: 'sales',
      component: <SaleTab />,
    },
    {
      label: 'Finalizado',
      id: 'finalized',
      component: <FinalizedTab />,
    },
  ];

  return (
    <Box display={'flex'} flexDirection={'row'}>
      <Box
        sx={{
          maxWidth: '338px',
          width: '100%',
          borderRight: '1px solid #E7E7E7',
        }}
      >
        {useContactProfilePageProps.findContact.isLoading ? (
          <Grid justifyContent={'center'} item xs={12}>
            <CircularProgress sx={{ color: '#000' }} />
          </Grid>
        ) : (
          <SidebarContactInformation
            findContact={useContactProfilePageProps.findContact}
            onClickEdit={() =>
              useContactProfilePageProps.setOpenCreateEditContact(true)
            }
          />
        )}
      </Box>
      <Box sx={{ width: '100%' }}>
        <HeaderPage
          name="Planes de Pago"
          extraContent={
            <ProjectTab
              currentTabValue={useContactProfilePageProps.currentTabValue}
              handleChange={useContactProfilePageProps.handleChangeTab}
              tabArray={userSections}
            />
          }
        />
        <Box sx={{ padding: '40px' }}>
          {userSections[useContactProfilePageProps.currentTabValue].component}
        </Box>
      </Box>
      <DialogCreateUpdateContact
        isEdit
        open={useContactProfilePageProps.openCreateEditContact}
        onClose={useContactProfilePageProps.onCloseCreateEditContact}
        usePageProps={useContactProfilePageProps}
      />
    </Box>
  );
};

export default ContactProfile;
