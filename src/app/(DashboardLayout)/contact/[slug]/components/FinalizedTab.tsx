import React, { FC } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import PaymentAccordion from './PaymentAccordion';
import { UseQueryResult } from '@tanstack/react-query';
import { GetContactPaymentPlanDto } from '@/common/dto';

const FinalizedTab: FC<{
  paymentPlan: UseQueryResult<GetContactPaymentPlanDto[], Error>;
}> = ({ paymentPlan }) => {
  return (
    <Box display={'flex'} rowGap={'40px'} flexDirection={'column'}>
      {paymentPlan.isLoading ? (
        <Grid justifyContent={'center'} item xs={12}>
          <CircularProgress sx={{ color: '#000' }} />
        </Grid>
      ) : (
        paymentPlan.data?.map((plan) => (
          <PaymentAccordion
            key={plan.payment_plan_id}
            plan={plan}
            hasPendingPayments={false}
            bgColor="success"
          />
        ))
      )}
    </Box>
  );
};

export default FinalizedTab;
