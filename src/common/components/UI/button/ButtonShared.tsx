import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const ButtonShared = styled((props: any) => <Button {...props} />)(
  ({ theme }) => ({
    color: '#505050',
    fontSize: 14,
    fontWeight: 600,
    padding: '8px 20px',
    lineHeight: '100%',
    borderRadius: 8,
    textTransform: 'none',
    backgroundColor: '#fff1e6',
    '&:hover': {
      backgroundColor: '#ffc69a',
      boxShadow: 'none',
    },
  })
);

export const DeleteButtonShared = styled((props: any) => <Button {...props} />)(
  ({ theme }) => ({
    color: '#FD0000',
    fontSize: 14,
    fontWeight: 400,
    padding: '8px 20px',
    lineHeight: '100%',
    borderRadius: 8,
    textTransform: 'none',
    backgroundColor: 'rgba(231, 231, 231, 0.25)',
    '&:hover': {
      backgroundColor: 'rgba(231, 231, 231, 0.50)',
      boxShadow: 'none',
    },
  })
);
