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
  onClickCreatePayment?: (paymentPlanId: number) => void;
  onClickCreateResale?: (currentPaymentPlan: GetContactPaymentPlanDto) => void;
  onClickMoveToFinancing?: ({ sale_id }: { sale_id: number }) => Promise<void>;
}> = ({
  plan,
  hasPendingPayments,
  bgColor,
  onClickCreatePayment,
  onClickCreateResale,
  onClickMoveToFinancing,
}) => {
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
  const paidPayment: ChipType[] = [
    {
      id: 1,
      bgColor: 'separation',
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          {DateTime.fromISO(plan.separation_date).toFormat('dd/LL/yyyy')}-&nbsp;
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
          {DateTime.fromISO(plan.created_at).toFormat('dd/LL/yyyy')}
          &nbsp;- Plan de Pago Creado ({plan.payment_plan_numbers} Meses)
          -&nbsp;
          {plan.project.currency_type}
          {formatCurrency(initialAmount)}
        </Typography>
      ),
    },
    ...plan.payments.map((payment): ChipType => {
      return {
        id: payment.payment_id + 4,
        bgColor: 'separation',
        content: (
          <>
            <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
              {DateTime.fromISO(payment.payment_made_at).toFormat('dd/LL/yyyy')}
              &nbsp;-&nbsp;{plan.project.currency_type}
              {formatCurrency(payment.amount)}
              &nbsp;Pago
            </Typography>
            {payment.notes ? (
              <Typography
                fontSize={'14px'}
                fontWeight={500}
                textAlign={'center'}
              >
                <span style={{ fontWeight: 700 }}>Nota:</span> {payment.notes}
              </Typography>
            ) : null}
          </>
        ),
      };
    }),
  ];
  if (plan.sale && plan.sale.stage === 'financed' && !!plan.sale.financed_at) {
    paidPayment.push({
      id: 4,
      bgColor: 'paymentPlanCreated',
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          {DateTime.fromISO(plan.sale.financed_at).toFormat('dd/LL/yyyy')}
          &nbsp;- Plan de Pago Financiado -&nbsp;
          {plan.project.currency_type}
          {formatCurrency(plan.total_financing)}
        </Typography>
      ),
    });
  }

  const pendingPayments: ChipType[] = pendingPaymentFromApi.map(
    (planDetail) => {
      const pendingAmount =
        parseFloat(planDetail.payment_amount) -
        parseFloat(planDetail.amount_paid);
      return {
        id: planDetail.payment_number,
        content: (
          <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
            {DateTime.fromISO(planDetail.payment_date).toFormat('dd/LL/yyyy')}{' '}
            -&nbsp;
            {plan.project.currency_type}
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
            {nextPayment?.payment_date
              ? `${plan.project.currency_type}${formatCurrency(
                  parseFloat(nextPayment?.payment_amount || '0') -
                    parseFloat(nextPayment?.amount_paid || '0')
                )} a pagar el 
            ${DateTime.fromISO(nextPayment?.payment_date || '').toFormat(
              'dd/LL/yyyy'
            )}`
              : `No hay pagos del inicial pendientes.`}
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
              {paidPayment.map((payment) => (
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
                onClickCreateResale={onClickCreateResale}
                onClickMoveToFinancing={onClickMoveToFinancing}
                plan={plan}
                pendingPaymentList={pendingPayments}
                pendingAmount={`${plan.project.currency_type}${formatCurrency(
                  parseFloat(plan.total_payment_amount) -
                    parseFloat(plan.total_amount_paid)
                )}`}
                financingAmount={`${plan.project.currency_type}${formatCurrency(
                  plan.total_financing
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
