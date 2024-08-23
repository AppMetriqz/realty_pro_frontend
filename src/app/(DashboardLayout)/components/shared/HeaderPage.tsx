import { ButtonShared } from '@/common/components/button/ButtonShared';
import { Box, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type HeaderPageProps = {
  name: string;
  btnLabel?: string;
  onClick?: () => void;
  extraContent?: ReactNode | string;
  noBorder?: boolean;
};

const HeaderPage: FC<HeaderPageProps> = ({
  name,
  btnLabel,
  onClick,
  extraContent,
  noBorder,
}) => {
  return (
    <Box
      sx={{
        //Estilo para poner el header de la pagina sticky
        // position: 'sticky',
        // zIndex: '1100',
        // top: '110px',
        // left: 'auto',
        // right: 0,
        // backgroundColor: '#fff',
        borderBottom: noBorder ? 'none' : '1px solid #E7E7E7',
      }}
    >
      <Box
        sx={{
          p: '40px',
        }}
        alignItems={'center'}
        display={'flex'}
      >
        <Typography
          mr="20px"
          color="#505050"
          fontSize="24px"
          fontWeight={500}
          letterSpacing={'0.5px'}
        >
          {name}
        </Typography>
        {btnLabel ? (
          <ButtonShared onClick={onClick}>{btnLabel}</ButtonShared>
        ) : null}
      </Box>
      {extraContent ? extraContent : null}
    </Box>
  );
};

export default HeaderPage;
