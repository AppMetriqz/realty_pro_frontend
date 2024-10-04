'use client';

import { apiAuth } from '@/api';
import React, {
  createContext,
  useState,
  FC,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import _ from 'lodash';
import { PermissionType } from '@/common/types/UserType';
import { GetUserDto } from '@/common/dto';
import { setPermissionValue } from '@/common/utils/setObjectHelper';
import { ROL } from '@/common/constants';

export const defaultPermission = {
  dashboard: {
    canView: false,
    canAssignSales: false,
    canAssignPaymentPlan: false,
  },
  paymentPlan: { canView: false },
  finance: { canView: false },
  project: { canView: false, canAdd: false, canEdit: false },
  sale: { canView: false, canDelete: false },
  unit: {
    canView: false,
    canSale: false,
    canEdit: false,
    canDelete: false,
    canCancel: false,
  },
  contact: { canView: false, canAdd: false, canEdit: false },
  user: { canView: false, canAdd: false, canEdit: false },
  setting: { canView: false, canAdd: false, canEdit: false, canDelete: false },
};

type CurrentUserContextType = {
  isLoading: boolean;
  authUser: GetUserDto | undefined;
  permissions: PermissionType;
  setPermissions: Dispatch<SetStateAction<PermissionType>>;
};

export const CurrentUserContext = createContext<CurrentUserContextType>({
  isLoading: false,
  authUser: undefined,
  permissions: defaultPermission,
  setPermissions: () => {},
});

export const CurrentUserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoadingPermission, setIsLoadingPermission] = useState(false);
  const currentUser = apiAuth.useCurrentUser();
  const [permissions, setPermissions] =
    useState<PermissionType>(defaultPermission);

  useEffect(() => {
    setIsLoadingPermission(true);
    if (
      currentUser &&
      currentUser.isSuccess &&
      currentUser.data &&
      currentUser.isAuth
    ) {
      if (currentUser.data.role_id === ROL.SUPER_ADMIN) {
        const superAdminPermissions = setPermissionValue(defaultPermission);
        setPermissions(superAdminPermissions);
      }
      if (currentUser.data.role_id === ROL.ADMIN) {
        const adminPermissions = setPermissionValue(
          defaultPermission,
          undefined,
          ['user.canEdit']
        );
        setPermissions(adminPermissions);
      }
      if (currentUser.data.role_id === ROL.EXECUTOR) {
        const executorPermissions = setPermissionValue(
          defaultPermission,
          undefined,
          ['finance.canView', 'project.canEdit']
        );
        setPermissions(executorPermissions);
      }
      if (currentUser.data.role_id === ROL.VISITOR) {
        const visitorPermissions = setPermissionValue(
          defaultPermission,
          undefined,
          [
            'dashboard.canAssignSales',
            'dashboard.canAssignPaymentPlan',
            'project.canAdd',
            'project.canEdit',
            'sale.canDelete',
            'unit.canSale',
            'unit.canEdit',
            'unit.canDelete',
            'unit.canCancel',
            'contact.canAdd',
            'contact.canEdit',
            'user.canAdd',
            'user.canEdit',
            'setting.canAdd',
            'setting.canEdit',
            'setting.canDelete',
          ]
        );
        setPermissions(visitorPermissions);
      }
    }
    setIsLoadingPermission(false);
  }, [currentUser]);

  const values = {
    isLoading:
      currentUser.isLoading || currentUser.isFetching || isLoadingPermission,
    authUser: currentUser.data,
    permissions,
    setPermissions,
  };

  return (
    <CurrentUserContext.Provider value={values}>
      {children}
    </CurrentUserContext.Provider>
  );
};
