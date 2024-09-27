'use client';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import SidebarContactInformation from './components/SidebarContactInformation';
import HeaderPage from '../../components/shared/HeaderPage';
import ProjectTab from '../../project/components/ProjectTab';
import useContactProfilePage from './usePage';
import SaleTab from './components/SaleTab';
import FundedTab from './components/FundedTab';
import { DialogCreateUpdateContact } from '../components/DialogCreateUpdateContact';
import { ContactFormInput } from '../core';
import { DateTime } from 'luxon';
import { DialogAddSpouse } from '../components/DialogAddSpouse';
import { DialogCreatePaymentPlan } from '@/common/components/Logic/DialogCreatePaymentPlan';
import { DialogCreatePayment } from './components/DialogCreatePayment';

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
            ).toFormat('dd/LL/yyyy') ?? ''
          );
        } else if (key === 'spouse') {
          useContactProfilePageProps.contactHookForm.setValue(
            'spouse_id',
            useContactProfilePageProps.findContact.data?.spouse?.contact_id
          );
          useContactProfilePageProps.contactHookForm.setValue(
            'spouse',
            useContactProfilePageProps.findContact.data?.spouse
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useContactProfilePageProps.findContact.isLoading]);

  const userSections = [
    {
      label: 'Ventas',
      id: 'sales',
      component: !!useContactProfilePageProps.findContactPaymentPlans.data
        ?.length ? (
        <SaleTab
          onClickCreatePayment={useContactProfilePageProps.onClickCreatePayment}
          onClickCreateResale={useContactProfilePageProps.onClickCreateResale}
          onClickMoveToFinancing={
            useContactProfilePageProps.onClickMoveToFinancing
          }
          paymentPlan={useContactProfilePageProps.findContactPaymentPlans}
        />
      ) : (
        <Typography variant="body1">Sin resultados.</Typography>
      ),
    },
    {
      label: 'Financiados',
      id: 'funded',
      component: !!useContactProfilePageProps.findFinancedContactPaymentPlans
        .data?.length ? (
        <FundedTab
          paymentPlan={
            useContactProfilePageProps.findFinancedContactPaymentPlans
          }
        />
      ) : (
        <Typography variant="body1">Sin resultados.</Typography>
      ),
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
            onClickAddSpouse={() =>
              useContactProfilePageProps.setOpenAddSpouse(true)
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
      <DialogAddSpouse
        open={useContactProfilePageProps.openAddSpouse}
        onClose={useContactProfilePageProps.onCloseAddSpouse}
        usePageProps={useContactProfilePageProps}
      />
      <DialogCreatePaymentPlan
        isResale={useContactProfilePageProps.isResale}
        open={useContactProfilePageProps.openCreatePaymentPlanModal}
        onClose={useContactProfilePageProps.onCloseCreatePaymentPlanModal}
        usePageProps={useContactProfilePageProps}
      />
      <DialogCreatePayment
        open={useContactProfilePageProps.openCreatePaymentModal}
        onClose={useContactProfilePageProps.onCloseCreatePaymentModal}
        usePageProps={useContactProfilePageProps}
      />
    </Box>
  );
};

export default ContactProfile;
