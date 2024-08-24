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

const accordionBgColors = {
  success: '#E0F5E7',
  warning: '#FFF1E6',
  danger: '#F9A0A080',
};

const PaymentAccordion: FC<{
  hasPendingPayments: boolean;
  bgColor: keyof typeof accordionBgColors;
}> = ({ hasPendingPayments, bgColor }) => {
  const paymentExample: ChipType[] = [
    {
      id: 1,
      bgColor: 'separation',
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          15/01/2024 - US$1,000.00 - Pago de Separacion
        </Typography>
      ),
    },
    {
      id: 2,
      bgColor: 'paymentPlanCreated',
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          15/01/2024 - Plan de Pago Creado (5 Meses) - US$29,000
        </Typography>
      ),
    },
  ];
  const pendingPayments: ChipType[] = [
    {
      id: 1,
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          15/01/2024 - US$5,800.00 Pago de Cuota (Pendiente)
        </Typography>
      ),
    },
    {
      id: 2,
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          15/02/2024 - US$5,8000.00 Pago de Cuota (Pendiente)
        </Typography>
      ),
    },
    {
      id: 3,
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          15/03/2024 - US$5,800.00 Pago de Cuota (Pendiente)
        </Typography>
      ),
    },
    {
      id: 4,
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          15/04/2024 - US$5,8000.00 Pago de Cuota (Pendiente)
        </Typography>
      ),
    },
    {
      id: 5,
      content: (
        <Typography fontSize={'14px'} fontWeight={500} textAlign={'center'}>
          15/05/2024 - US$5,800.00 Pago de Cuota (Pendiente)
        </Typography>
      ),
    },
  ];

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
            Casa 1, Residencial Dalia Fernanda
          </Typography>
          <Typography fontSize={'18px'} fontWeight={500}>
            US$50,000.00
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography fontSize={'14px'} fontWeight={400}>
            US$10,000.00 a pagar el 15/02/2024
          </Typography>
          <Typography fontSize={'14px'} fontWeight={400}>
            Balance: US$30,000.00
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
            Inicial (30%): <span style={{ fontWeight: 500 }}>US$30,000</span>
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
              <PendingPayment pendingPaymentList={pendingPayments} />
            ) : null}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PaymentAccordion;
