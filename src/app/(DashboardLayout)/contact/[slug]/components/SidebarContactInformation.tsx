import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import UserIcon from '@/icons/UserIcon';
import HeartIcon from '@/icons/HeartIcon';
import PhoneIcon from '@/icons/PhoneIcon';
import EmailIcon from '@/icons/EmailIcon';
import CakeIcon from '@/icons/CakeIcon';
import AddressIcon from '@/icons/AddressIcon';
import WorkIcon from '@/icons/WorkIcon';
import UserTag from '@/icons/UserTag';
import UserInfoLabel, { UserInfoLabelProps } from './UserInfoLabel';

const SidebarContactInformation = () => {
  const userInformations: (UserInfoLabelProps & { id: string | number })[] = [
    { id: 1, icon: <UserTag />, label: 'Etiqueta:', value: 'Vendedor' },
    {
      id: 2,
      icon: <HeartIcon />,
      label: 'Estado Civil:',
      value: 'Soltero',
      extraContent: (
        <Button
          variant="text"
          sx={{
            color: '#18A1EE',
            fontSize: '12px',
            padding: 0,
            fontWeight: 500,
          }}
        >
          + Agregar Conyegue
        </Button>
      ),
    },
    {
      id: 3,
      icon: <PhoneIcon />,
      label: 'Telefonos:',
      value: '(809) 922 8060',
      extraContent: <Typography fontWeight={500}>(809) 922 8060</Typography>,
    },
    { id: 4, icon: <EmailIcon />, label: 'Email:', value: 'abata27@gmail.com' },
    {
      id: 5,
      icon: <CakeIcon />,
      label: 'Fecha de Nacimiento:',
      value: '08/11/1991',
    },
    {
      id: 6,
      icon: <AddressIcon />,
      label: 'Direccion:',
      value: 'Calle 10 Casa #1 Santiago, Gurabo Republica Dominicana',
    },
    {
      id: 7,
      icon: <WorkIcon />,
      label: 'Empresa donde Labora:',
      value: 'Laro Computers',
      extraContent: (
        <>
          <Typography fontWeight={400}>Ocupacion:</Typography>
          <Typography mt="15px" fontWeight={500}>
            Programador
          </Typography>
        </>
      ),
      hasDivider: false,
    },
  ];
  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          marginTop: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid #E7E7E7',
        }}
      >
        <Typography color={'#505050'} mb={1} variant="h3" fontSize="21px">
          Samuel L. Jackson
        </Typography>
        <UserIcon />
        <Typography
          color={'rgba(80, 80, 80, 0.50)'}
          variant="body2"
          mb={1.5}
          fontWeight={500}
        >
          Perfil creado 11/08/2012
        </Typography>
        <Button
          sx={{
            color: '#18A1EE',
            fontSize: '12px',
            padding: 0,
            fontWeight: 500,
          }}
          variant="text"
        >
          Editar
        </Button>
      </Box>
      <Box sx={{ padding: '40px' }}>
        {userInformations.map((userInfo) => (
          <UserInfoLabel key={userInfo.id} {...userInfo} />
        ))}
      </Box>
    </>
  );
};

export default SidebarContactInformation;
