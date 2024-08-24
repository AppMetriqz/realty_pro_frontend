import { Box, Divider, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';

export type UserInfoLabelProps = {
  icon: ReactElement;
  label: string;
  value: string;
  hasDivider?: boolean;
  extraContent?: ReactElement | string;
};

const UserInfoLabel: FC<UserInfoLabelProps> = ({
  icon,
  label,
  value,
  hasDivider = true,
  extraContent,
}) => {
  return (
    <>
      <Box
        display={'flex'}
        mb="15px"
        alignItems={'center'}
        flexDirection={'row'}
      >
        {icon}
        <Typography ml={1} fontWeight={400}>
          {label}
        </Typography>
      </Box>
      <Typography ml={'25px'} fontWeight={500}>
        {value}
      </Typography>
      {extraContent ? (
        <Box pt={'15px'} ml={'25px'}>
          {extraContent}
        </Box>
      ) : null}
      {hasDivider ? <Divider sx={{ marginY: '25px', width: '100%' }} /> : null}
    </>
  );
};

export default UserInfoLabel;
