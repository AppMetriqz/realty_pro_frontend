'use client';
import React, { useEffect, useState } from 'react';
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
import { apiAuth } from '@/api';

type MenuNavegationItemType = {
  id: string;
  title: string;
  icon: React.ComponentType; // Icon component type
  href: string;
  selectedArray?: string[];
};

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const currentUser = apiAuth.useCurrentUser();
  const { permissions, setPermissions, isLoading } = usePermission(currentUser);
  const { onLogOut } = useFunctions();
  const [navigationMenuItems, setNavigationMenuItems] = useState<
    MenuNavegationItemType[]
  >([]);
  const [settingsMenuItems, setSettingsMenuItems] = useState<
    MenuNavegationItemType[]
  >([]);

  const createMenuItem = (
    id: string,
    title: string,
    icon: React.ComponentType,
    href: string,
    selectedArray?: string[]
  ) => ({
    id,
    title,
    icon,
    href,
    selectedArray,
  });

  useEffect(() => {
    const newNavigationMenuItems: MenuNavegationItemType[] = [];
    const newSettingsMenuItems: MenuNavegationItemType[] = [];

    if (permissions.dashboard.canView) {
      newNavigationMenuItems.push(
        createMenuItem(uniqueId(), 'Escritorio', ChartIcon, routers.dashboard, [
          routers.dashboard,
        ])
      );
    }
    if (permissions.paymentPlan.canView) {
      newNavigationMenuItems.push(
        createMenuItem(
          uniqueId(),
          'Planes de Pago',
          PaymentIcon,
          routers.paymentPlan,
          [routers.paymentPlan]
        )
      );
    }
    if (permissions.finance.canView) {
      newNavigationMenuItems.push(
        createMenuItem(uniqueId(), 'Finanzas', FinanceIcon, routers.finance, [
          routers.finance,
        ])
      );
    }
    if (permissions.project.canView) {
      newNavigationMenuItems.push(
        createMenuItem(uniqueId(), 'Proyectos', ProjectIcon, routers.project)
      );
    }
    if (permissions.contact.canView) {
      newNavigationMenuItems.push(
        createMenuItem(uniqueId(), 'Contactos', ProfileIcon, routers.contact, [
          routers.contact,
        ])
      );
    }
    if (permissions.user.canView) {
      newSettingsMenuItems.push(
        createMenuItem(uniqueId(), 'Usuarios', UsersIcon, routers.user, [
          routers.user,
        ])
      );
    }
    if (permissions.setting.canView) {
      newSettingsMenuItems.push(
        createMenuItem(
          uniqueId(),
          'Configuraciones',
          SettingsIcon,
          routers.settings,
          [routers.settings]
        )
      );
    }

    setNavigationMenuItems(newNavigationMenuItems);
    setSettingsMenuItems(newSettingsMenuItems);
  }, [permissions, isLoading]);

  const onClickLogOut = () => {
    onLogOut(() => setPermissions(defaultPermission));
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
