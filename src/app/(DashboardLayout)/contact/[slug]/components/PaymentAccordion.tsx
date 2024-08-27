import React, { FC } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaymentInformationChip, { ChipType } from './PaymentInformationChip';
import PendingPayment from './PendingPayment';
import { GetContactPaymentPlanDto } from '@/common/dto';
import { formatCurrency } from '@/common/utils/numericHelpers';
import { DateTime } from 'luxon';

const accordionBgColors = {
  success: '#E0F5E7',
  warning: '#FFF1E6',
  danger: '#F9A0A080',
};

const PaymentAccordion: FC<{
  plan: GetContactPaymentPlanDto;
  hasPendingPayments: boolean;
  bgColor: keyof typeof accordionBgColors;
  onClickCreatePayment: (paymentPlanId: number) => void;
}> = ({ plan, hasPendingPayments, bgColor, onClickCreatePayment }) => {
  const initialAmount =
    parseFloat(plan.total_amount) * plan.separation_rate -
    parseFloat(plan.separation_amount) +
    parseFloat(plan.separation_amount);
  const nextPayment = plan.payment_plan_details
    .sort((a, b) => a.payment_number - b.payment_number)
    .find((plan) => plan.status === 'pending');
  const pendingPaymentFromApi = plan.payment_plan_details.filter(
    (p) => p.status === 'pending'
  );
  const paidPaymentFromApi = plan.payment_plan_details.filter(
    (p) => p.status === 'paid'
  );
  const paymentExample: ChipType[] = [
    {
      id: 1,
      bgColor: 'separation',
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          {DateTime.fromISO(plan.separation_date).toLocaleString()} -&nbsp;
          {plan.project.currency_type}
          {formatCurrency(parseFloat(plan.separation_amount))} - Pago de
          Separación
        </Typography>
      ),
    },
    {
      id: 2,
      bgColor: 'paymentPlanCreated',
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          {DateTime.fromISO(plan.created_at).toLocaleString()} - Plan de Pago
          Creado ({plan.payment_plan_numbers} Meses) -{' '}
          {plan.project.currency_type}
          {formatCurrency(initialAmount)}
        </Typography>
      ),
    },
    ...paidPaymentFromApi.map((planDetail): ChipType => {
      return {
        id: planDetail.payment_number + 2,
        bgColor: 'separation',
        content: (
          <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
            {DateTime.fromISO(planDetail.payment_date).toLocaleString()}&nbsp;
            -&nbsp;{plan.project.currency_type}
            {formatCurrency(parseFloat(planDetail.payment_amount))}&nbsp;- Pago
            de cuota.
          </Typography>
        ),
      };
    }),
  ];
  const pendingAmount = pendingPaymentFromApi.reduce((prev, curr) => {
    const pendingAmount =
      parseFloat(curr.payment_amount) - parseFloat(curr.amount_paid);
    return prev + pendingAmount;
  }, 0);
  const pendingPayments: ChipType[] = pendingPaymentFromApi.map(
    (planDetail) => {
      const pendingAmount =
        parseFloat(planDetail.payment_amount) -
        parseFloat(planDetail.amount_paid);
      return {
        id: planDetail.payment_number,
        content: (
          <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
            {DateTime.fromISO(planDetail.payment_date).toLocaleString()} -&nbsp;
            {formatCurrency(parseFloat(planDetail.payment_amount))} Pago de
            cuota (Pendiente:&nbsp;
            {formatCurrency(pendingAmount)})
          </Typography>
        ),
      };
    }
  );

  return (
    <Box
      sx={{
        border: '1px solid #E7E7E7',
        boxShadow: '0px 1px 4px 0px #E7E7E7',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          padding: '25px',
          borderRadius: '8px 8px 0px 0px',
          background: accordionBgColors[bgColor],
        }}
      >
        <Box mb={'17px'} display={'flex'} justifyContent={'space-between'}>
          <Typography fontSize={'18px'} fontWeight={500}>
            {plan.unit.name}, {plan.project.name}
          </Typography>
          <Typography fontSize={'18px'} fontWeight={500}>
            {plan.project.currency_type}
            {formatCurrency(parseFloat(plan.total_amount))}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography fontSize={'14px'} fontWeight={400}>
            {plan.project.currency_type}
            {formatCurrency(
              parseFloat(nextPayment?.payment_amount || '0') -
                parseFloat(nextPayment?.amount_paid || '0')
            )}
            &nbsp;a pagar el&nbsp;
            {DateTime.fromISO(nextPayment?.payment_date || '').toLocaleString()}
          </Typography>
          <Typography fontSize={'14px'} fontWeight={400}>
            Balance a Financiar: {plan.project.currency_type}
            {formatCurrency(parseFloat(plan.total_amount) - initialAmount)}
          </Typography>
        </Box>
      </Box>
      <Accordion
        sx={{
          boxShadow: 'none',
          position: 'inherit',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            borderRadius: '0 0 8px 8px',
            '.MuiAccordionSummary-content': {
              display: 'none',
            },
          }}
        />
        <AccordionDetails sx={{ padding: '32px 25px' }}>
          <Typography mb="69px" fontSize={'18px'} fontWeight={400}>
            Inicial ({plan.separation_rate * 100}
            %):&nbsp;
            <span style={{ fontWeight: 500 }}>
              {plan.project.currency_type}
              {formatCurrency(initialAmount)}
            </span>
          </Typography>
          <Box
            display="flex"
            flexDirection={'column'}
            alignItems={'center'}
            mx="43px"
          >
            <Box display={'flex'} rowGap={'25px'} flexDirection={'column'}>
              {paymentExample.map((payment) => (
                <PaymentInformationChip
                  key={payment.id}
                  bgColor={payment.bgColor}
                >
                  {payment.content}
                </PaymentInformationChip>
              ))}
            </Box>
            {hasPendingPayments ? (
              <PendingPayment
                onClickCreatePayment={onClickCreatePayment}
                paymentPlanId={plan.payment_plan_id}
                pendingPaymentList={pendingPayments}
                pendingAmount={`${plan.project.currency_type}${formatCurrency(
                  pendingAmount
                )}`}
                financingAmount={`${plan.project.currency_type}${formatCurrency(
                  parseFloat(plan.total_amount) - initialAmount
                )}`}
              />
            ) : null}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PaymentAccordion;
