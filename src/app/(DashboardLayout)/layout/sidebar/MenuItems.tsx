import { uniqueId } from 'lodash';

import routers from '@/common/constants/routes';
import ChartIcon from '@/icons/ChartIcon';
import PaymentIcon from '@/icons/PaymentIcon';
import FinanceIcon from '@/icons/FinanceIcon';
import ProjectIcon from '@/icons/ProjectIcon';
import ProfileIcon from '@/icons/ProfileIcon';
import SettingsIcon from '@/icons/SettingsIcon';
import UsersIcon from '@/icons/UsersIcon';

export const NavigationMenuitems = [
  {
    id: uniqueId(),
    title: 'Escritorio',
    icon: ChartIcon,
    href: routers.dashboard,
    selectedArray: [routers.dashboard],
  },
  {
    id: uniqueId(),
    title: 'Planes de Pago',
    icon: PaymentIcon,
    href: routers.paymentPlan,
    selectedArray: [routers.paymentPlan],
  },
  {
    id: uniqueId(),
    title: 'Finanzas',
    icon: FinanceIcon,
    href: routers.finance,
    selectedArray: [routers.finance],
  },
  {
    id: uniqueId(),
    title: 'Proyectos',
    icon: ProjectIcon,
    href: routers.project,
  },
  {
    id: uniqueId(),
    title: 'Contactos',
    icon: ProfileIcon,
    href: routers.contact,
    selectedArray: [routers.contact],
  },
];

export const SettingsMenuitems = [
  {
    id: uniqueId(),
    title: 'Usuarios',
    icon: UsersIcon,
    href: routers.user,
    selectedArray: [routers.user],
  },
  {
    id: uniqueId(),
    title: 'Configuraciones',
    icon: SettingsIcon,
    href: routers.settings,
    selectedArray: [routers.settings],
  },
];
