import { Box } from '@mui/material';
import React, { FC, ReactElement } from 'react';

const chipColor = {
  separation: '#E0F5E7',
  paymentPlanCreated: '#ECF8FF',
  paymentPlanCancelled: '#FCD0D0',
  note: '#FFFCDD',
  reSale: '#F3EAFF',
  pending: '#E7E7E780',
  resold: '#F3EAFF',
};

export type ChipType = {
  id: number;
  bgColor?: keyof typeof chipColor;
  content: ReactElement;
};

type PaymentInformationChipType = {
  bgColor?: keyof typeof chipColor;
  children: ReactElement | string;
};

const PaymentInformationChip: FC<PaymentInformationChipType> = ({
  bgColor = 'pending',
  children,
}) => {
  return (
    <Box
      sx={{
        maxWidth: '620px',
        width: '100%',
        borderRadius: '41px',
        backgroundColor: chipColor[bgColor],
        paddingY: '13px',
        paddingX: '51px',
      }}
    >
      {children}
    </Box>
  );
};

export default PaymentInformationChip;
