import React from 'react';
import { styled } from '@mui/material/styles';
import { Checkbox } from '@mui/material';
import { Colors } from '@/common/constants/general';

const primaryColor = Colors.primary;

export const CheckBoxSharedWhite = styled((props: any) => (
  <Checkbox {...props} />
))(({ theme }) => ({
  '&.Mui-checked': {
    color: '#fff',
  },
}));

export const CheckBoxShared = styled(Checkbox)({
  '&.Mui-checked': {
    color: primaryColor,
  },
});
