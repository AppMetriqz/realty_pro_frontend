'use client';

import { apiAuth } from '@/api';
import React, {
  createContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from 'react';
import _ from 'lodash';
import { PermissionType } from '@/common/types/UserType';
import { GetUserDto } from '@/common/dto';
import { setPermissionValue } from '@/common/utils/setObjectHelper';

const defaultPermission = {
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
  setting: { canView: false, canAdd: false, canEdit: false },
};

type CurrentUserContextType = {
  isLoading: boolean;
  authUser: GetUserDto | undefined;
  permissions: PermissionType;
};

export const CurrentUserContext = createContext<CurrentUserContextType>({
  isLoading: false,
  authUser: undefined,
  permissions: defaultPermission,
});

export const CurrentUserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const currentUser = apiAuth.useCurrentUser();
  const [permissions, setPermissions] =
    useState<PermissionType>(defaultPermission);

  return (
    <CurrentUserContext.Provider
      value={{
        isLoading: currentUser.isLoading,
        authUser: currentUser.data,
        permissions,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
