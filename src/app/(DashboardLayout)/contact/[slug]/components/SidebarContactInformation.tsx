import React, { FC } from 'react';
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
import { UseQueryResult } from '@tanstack/react-query';
import { GetContactDto } from '@/common/dto';
import { ContactType, MaritalStatusType } from '@/common/constants';
import { DateTime } from 'luxon';

type SidebarContactInformationProps = {
  findContact: UseQueryResult<GetContactDto, Error>;
  onClickEdit: () => void;
  onClickAddSpouse: () => void;
};

const SidebarContactInformation: FC<SidebarContactInformationProps> = ({
  findContact,
  onClickEdit,
  onClickAddSpouse,
}) => {
  const userInformations: (UserInfoLabelProps & { id: string | number })[] = [
    {
      id: 1,
      icon: <UserTag />,
      label: 'Etiqueta:',
      value:
        ContactType.find((type) => type.value === findContact.data?.type)
          ?.label ?? '',
    },
    {
      id: 2,
      icon: <HeartIcon />,
      label: 'Estado Civil:',
      value:
        MaritalStatusType.find(
          (status) => status.value === findContact.data?.marital_status
        )?.label ?? '',
      extraContent: findContact.data?.spouse?.contact_id ? (
        <>
          <Typography fontWeight={400}>Conyuge:</Typography>
          <Typography mt="15px" fontWeight={500}>
            {findContact.data?.spouse?.first_name}&nbsp;
            {findContact.data?.spouse?.last_name}
          </Typography>
        </>
      ) : (
        <Button
          variant="text"
          sx={{
            color: '#18A1EE',
            fontSize: '12px',
            padding: 0,
            fontWeight: 500,
          }}
          onClick={onClickAddSpouse}
        >
          + Agregar Conyuge
        </Button>
      ),
    },
    {
      id: 3,
      icon: <PhoneIcon />,
      label: 'Teléfonos:',
      value: findContact.data?.phone_number_1 ?? '',
      extraContent: findContact.data?.phone_number_2 ? (
        <Typography fontWeight={500}>
          {findContact.data?.phone_number_2}
        </Typography>
      ) : undefined,
    },
    {
      id: 4,
      icon: <EmailIcon />,
      label: 'Email:',
      value: findContact.data?.email ?? '',
    },
    {
      id: 5,
      icon: <CakeIcon />,
      label: 'Fecha de Nacimiento:',
      value: findContact.data?.date_of_birth
        ? DateTime.fromISO(findContact.data?.date_of_birth).toFormat(
            'dd/LL/yyyy'
          )
        : '',
    },
    {
      id: 6,
      icon: <AddressIcon />,
      label: 'Dirección:',
      value: findContact.data?.address ?? '',
    },
    {
      id: 7,
      icon: <WorkIcon />,
      label: 'Empresa donde Labora:',
      value: findContact.data?.workplace ?? '',
      extraContent: (
        <>
          <Typography fontWeight={400}>Ocupación:</Typography>
          {findContact.data?.workplace ? (
            <Typography mt="15px" fontWeight={500}>
              {findContact.data?.work_occupation}
            </Typography>
          ) : null}
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
          {findContact.data?.first_name} {findContact.data?.last_name}
        </Typography>
        <UserIcon />
        <Typography
          color={'rgba(80, 80, 80, 0.50)'}
          variant="body2"
          mb={1.5}
          fontWeight={500}
        >
          Perfil creado&nbsp;
          {findContact.data?.created_at
            ? DateTime.fromISO(findContact.data?.created_at).toFormat(
                'dd/LL/yyyy'
              )
            : ''}
        </Typography>
        <Button
          sx={{
            color: '#18A1EE',
            fontSize: '12px',
            padding: 0,
            fontWeight: 500,
          }}
          onClick={onClickEdit}
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
