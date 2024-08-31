import React, { FC } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import PaymentInformationChip, { ChipType } from './PaymentInformationChip';
import { GetContactPaymentPlanDto } from '@/common/dto';

type PendingPaymentProps = {
  pendingPaymentList: ChipType[];
  pendingAmount: string;
  financingAmount: string;
  plan: GetContactPaymentPlanDto;
  onClickCreatePayment?: (paymentPlanId: number) => void;
  onClickCreateResale?: (currentPaymentPlan: GetContactPaymentPlanDto) => void;
  onClickMoveToFinancing?: ({ sale_id }: { sale_id: number }) => Promise<void>;
};

const PendingPayment: FC<PendingPaymentProps> = ({
  pendingPaymentList,
  pendingAmount,
  financingAmount,
  plan,
  onClickCreatePayment,
  onClickCreateResale,
  onClickMoveToFinancing,
}) => {
  return (
    <>
      <Divider sx={{ width: '250px', marginY: '35px' }} />
      <Typography fontSize={'16px'} fontWeight={500}>
        Total Pagos Pendiente (Inicial): {pendingAmount}
      </Typography>
      <Box my={'32px'} display="flex" columnGap={'44px'}>
        {parseFloat(pendingAmount.replaceAll(/[US$,]/gi, '')) > 0 ? (
          <>
            <Button
              sx={{
                fontWeight: 400,
                backgroundColor: '#F3EAFF',
                '&:hover': { backgroundColor: '#E4D1FF' },
              }}
              onClick={() => onClickCreateResale?.(plan)}
            >
              Crear Reventa
            </Button>
            <Button
              sx={{
                backgroundColor: '#F3F3F3',
                '&:hover': { backgroundColor: '#E6E6E6' },
              }}
              onClick={() => onClickCreatePayment?.(plan.payment_plan_id)}
            >
              Nuevo Pago
            </Button>
          </>
        ) : null}
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
        disabled={
          pendingPaymentList.length > 0 || plan.sale.stage === 'financed'
        }
        onClick={() => onClickMoveToFinancing?.({ sale_id: plan.sale.sale_id })}
      >
        Pasar a Financamiento ({financingAmount})
      </Button>
    </>
  );
};

export default PendingPayment;
