'use client';
import React from 'react';
import { Box, Divider, List, Typography } from '@mui/material';
import NavItem from './NavItem';
import { uniqueId } from 'lodash';
import LogoutIcon from '../../../../../public/images/svg/logoutIcon.svg';
import useFunctions from '@/common/utils/useAuthentication';
import { defaultPermission } from '@/context/CurrentUserContext';
import ChartIcon from '@/icons/ChartIcon';
import routers from '@/common/constants/routes';
import PaymentIcon from '@/icons/PaymentIcon';
import FinanceIcon from '@/icons/FinanceIcon';
import ProjectIcon from '@/icons/ProjectIcon';
import ProfileIcon from '@/icons/ProfileIcon';
import UsersIcon from '@/icons/UsersIcon';
import SettingsIcon from '@/icons/SettingsIcon';
import usePermission from '@/common/hook/usePermission';

type MenuNavegationItemType = {
  id: string;
  title: string;
  icon: () => JSX.Element;
  href: string;
  selectedArray?: Array<string>;
};

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const { permissions, setPermissions } = usePermission();
  const { onLogOut } = useFunctions();

  let navigationMenuItems: MenuNavegationItemType[] = [];
  let settingsMenuItems: MenuNavegationItemType[] = [];
  if (permissions.dashboard.canView) {
    navigationMenuItems.push({
      id: uniqueId(),
      title: 'Escritorio',
      icon: ChartIcon,
      href: routers.dashboard,
      selectedArray: [routers.dashboard],
    });
  }
  if (permissions.paymentPlan.canView) {
    navigationMenuItems.push({
      id: uniqueId(),
      title: 'Planes de Pago',
      icon: PaymentIcon,
      href: routers.paymentPlan,
      selectedArray: [routers.paymentPlan],
    });
  }
  if (permissions.finance.canView) {
    navigationMenuItems.push({
      id: uniqueId(),
      title: 'Finanzas',
      icon: FinanceIcon,
      href: routers.finance,
      selectedArray: [routers.finance],
    });
  }
  if (permissions.project.canView) {
    navigationMenuItems.push({
      id: uniqueId(),
      title: 'Proyectos',
      icon: ProjectIcon,
      href: routers.project,
    });
  }
  if (permissions.contact.canView) {
    navigationMenuItems.push({
      id: uniqueId(),
      title: 'Contactos',
      icon: ProfileIcon,
      href: routers.contact,
      selectedArray: [routers.contact],
    });
  }
  if (permissions.user.canView) {
    settingsMenuItems.push({
      id: uniqueId(),
      title: 'Usuarios',
      icon: UsersIcon,
      href: routers.user,
      selectedArray: [routers.user],
    });
  }
  if (permissions.setting.canView) {
    settingsMenuItems.push({
      id: uniqueId(),
      title: 'Configuraciones',
      icon: SettingsIcon,
      href: routers.settings,
      selectedArray: [routers.settings],
    });
  }

  const onClickLogOut = () => {
    setPermissions(defaultPermission);
    onLogOut();
  };

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
        {navigationMenuItems.map((item) => {
          return (
            <NavItem item={item} key={item.id} onClick={toggleMobileSidebar} />
          );
        })}
        <Divider sx={{ margin: '40px 20px' }} />
        <Typography pb={1} pl={2.5} color="rgba(80, 80, 80, 0.50)">
          Ajustes
        </Typography>
        {settingsMenuItems.map((item) => {
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
          onClick={onClickLogOut}
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
