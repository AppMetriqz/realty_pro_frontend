import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Colors } from '@/common/constants/general';

export const ButtonIconPrimaryShared = styled((props: any) => (
  <Button {...props} />
))(({ theme }) => ({
  height: 56,
  color: Colors.white,
  fontSize: 16,
  borderRadius: 6,
  paddingLeft: 20,
  paddingRight: 20,
  border: '1px solid #D6D6D6',
  textTransform: 'none',
  backgroundColor: Colors.primary,
  '&:hover': {
    backgroundColor: 'rgba(158,11,15,0.8)',
    boxShadow: 'none',
  },
}));

export const ButtonIconSecondaryShared = styled((props: any) => (
  <Button {...props} />
))(({ theme }) => ({
  height: 56,
  color: Colors.black,
  fontSize: 16,
  borderRadius: 6,
  paddingLeft: 18,
  paddingRight: 18,
  border: '1px solid #D6D6D6',
  textTransform: 'none',
  backgroundColor: Colors.secondary,
}));
