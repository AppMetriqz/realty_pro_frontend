import React from 'react';
import { NavigationMenuitems, SettingsMenuitems } from './MenuItems';
import { Box, Divider, List, Typography } from '@mui/material';
import NavItem from './NavItem';
import { uniqueId } from 'lodash';
import LogoutIcon from '../../../../../public/images/svg/logoutIcon.svg';
import useFunctions from '@/common/utils/useAuthentication';

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const { onLogOut } = useFunctions();

  return (
    <Box
      sx={{
        px: 2.5,
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        <Typography pb={1} pl={2.5} color="rgba(80, 80, 80, 0.50)">
          Navegación
        </Typography>
        {NavigationMenuitems.map((item) => {
          return (
            <NavItem item={item} key={item.id} onClick={toggleMobileSidebar} />
          );
        })}
        <Divider sx={{ margin: '40px 20px' }} />
        <Typography pb={1} pl={2.5} color="rgba(80, 80, 80, 0.50)">
          Ajustes
        </Typography>
        {SettingsMenuitems.map((item) => {
          return (
            <NavItem item={item} key={item.id} onClick={toggleMobileSidebar} />
          );
        })}
        <NavItem
          item={{
            id: uniqueId(),
            title: 'Cerrar sesión',
            icon: LogoutIcon,
            href: '/login',
          }}
          onClick={onLogOut}
        />
      </List>
      <Box sx={{ px: 3 }} style={{ bottom: 28 }}>
        <Typography fontSize={'12px'} fontWeight={400} letterSpacing={'0.5px'}>
          © {new Date().getFullYear()} Realtor Pro. Todos los derechos
          reservados.
        </Typography>
      </Box>
    </Box>
  );
};
export default SidebarItems;
