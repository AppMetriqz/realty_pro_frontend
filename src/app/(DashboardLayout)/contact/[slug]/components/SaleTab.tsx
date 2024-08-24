import React from 'react';
import PaymentAccordion from './PaymentAccordion';
import { Box } from '@mui/material';

const SaleTab = () => {
  return (
    <Box display={'flex'} rowGap={'40px'} flexDirection={'column'}>
      <PaymentAccordion hasPendingPayments bgColor="warning" />
      <PaymentAccordion hasPendingPayments bgColor="warning" />
    </Box>
  );
};

export default SaleTab;
