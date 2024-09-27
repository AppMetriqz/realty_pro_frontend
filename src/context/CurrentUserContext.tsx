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
import Cookies from 'js-cookie';

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
  const currentUser = apiAuth.useCurrentUser(!!Cookies.get('token'));
  const [permissions, setPermissions] =
    useState<PermissionType>(defaultPermission);

  useEffect(() => {
    if (currentUser && currentUser.data && currentUser.isAuth) {
      if (currentUser.data.role_id === ROL.SUPER_ADMIN) {
        setPermissions(setPermissionValue(defaultPermission, true));
      }
      if (currentUser.data.role_id === ROL.ADMIN) {
        setPermissions(
          setPermissionValue(defaultPermission, true, undefined, [
            'user.canEdit',
          ])
        );
      }
      if (currentUser.data.role_id === ROL.EXECUTOR) {
        setPermissions(
          setPermissionValue(defaultPermission, true, undefined, [
            'finance.canView',
          ])
        );
      }
      if (currentUser.data.role_id === ROL.VISITOR) {
        setPermissions(
          setPermissionValue(defaultPermission, true, undefined, [
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
          ])
        );
      }
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider
      value={{
        isLoading: currentUser.isLoading || currentUser.isRefetching,
        authUser: currentUser.data,
        permissions,
        setPermissions,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
