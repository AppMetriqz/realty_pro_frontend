import React from 'react';
import { Box } from '@mui/material';
import PaymentAccordion from './PaymentAccordion';

const FinalizedTab = () => {
  return (
    <Box display={'flex'} rowGap={'40px'} flexDirection={'column'}>
      <PaymentAccordion hasPendingPayments={false} bgColor="success" />
      <PaymentAccordion hasPendingPayments={false} bgColor="danger" />
    </Box>
  );
};

export default FinalizedTab;
