import { apiAuth } from '@/api';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { PermissionType } from '../types/UserType';
import { setPermissionValue } from '../utils/setObjectHelper';
import { ROL } from '../constants';
import { UseQueryResult } from '@tanstack/react-query';
import { GetUserDto } from '../dto';

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
  setting: { canView: false, canAdd: false, canEdit: false },
};

const usePermission = () => {
  const currentUser = apiAuth.useCurrentUser(!!Cookies.get('token'));
  const [permissions, setPermissions] =
    useState<PermissionType>(defaultPermission);
  console.log({ permissions });

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
          ])
        );
      }
    }
  }, [currentUser]);

  return {
    permissions,
    setPermissions,
  };
};

export default usePermission;
