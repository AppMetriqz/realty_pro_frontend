import React, { FC } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import PaymentInformationChip, { ChipType } from './PaymentInformationChip';

type PendingPaymentProps = { pendingPaymentList: ChipType[] };

const PendingPayment: FC<PendingPaymentProps> = ({ pendingPaymentList }) => {
  return (
    <>
      <Divider sx={{ width: '250px', marginY: '35px' }} />
      <Typography fontSize={'16px'} fontWeight={500}>
        Total Pagos Pendiente (Inicial): US$29,000
      </Typography>
      <Box my={'32px'} display="flex" columnGap={'44px'}>
        <Button
          sx={{
            fontWeight: 400,
            backgroundColor: '#F3EAFF',
            '&:hover': { backgroundColor: '#E4D1FF' },
          }}
        >
          Crear Reventa
        </Button>
        <Button
          sx={{
            backgroundColor: '#F3F3F3',
            '&:hover': { backgroundColor: '#E6E6E6' },
          }}
        >
          Nuevo Pago
        </Button>
      </Box>
      <Box display={'flex'} rowGap={'25px'} flexDirection={'column'}>
        {pendingPaymentList.map((payment) => (
          <PaymentInformationChip key={payment.id}>
            {payment.content}
          </PaymentInformationChip>
        ))}
      </Box>
      <Button
        sx={{
          mt: '49px',
          backgroundColor: '#FFF1E6',
          '&:hover': { backgroundColor: '#FFE3CD' },
        }}
      >
        Pasar a Financamiento (US$70,000.00)
      </Button>
    </>
  );
};

export default PendingPayment;
