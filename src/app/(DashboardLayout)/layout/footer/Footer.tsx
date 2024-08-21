import React from 'react';
import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      style={{ paddingTop: 64, backgroundColor: '#505050' }}
      display="flex"
      flexDirection={'column'}
      alignItems="flex-start"
      justifyContent="flex-start"
      height={'100%'}
      width={'100%'}
    ></Box>
  );
};

export default Footer;
