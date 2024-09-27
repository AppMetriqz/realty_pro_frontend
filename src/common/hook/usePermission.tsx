import { apiAuth } from '@/api';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { PermissionType } from '../types/UserType';
import { setPermissionValue } from '../utils/setObjectHelper';
import { ROL } from '../constants';

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

const usePermission = () => {
  const [isLoadingPermission, setIsLoadingPermission] = useState(false);
  const currentUser = apiAuth.useCurrentUser(!!Cookies.get('token'));
  const [permissions, setPermissions] =
    useState<PermissionType>(defaultPermission);

  useEffect(() => {
    setIsLoadingPermission(true);
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
            'project.canEdit',
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
    setIsLoadingPermission(false);
  }, [currentUser]);

  return {
    isLoading:
      currentUser.isLoading || currentUser.isFetching || isLoadingPermission,
    permissions,
    setPermissions,
  };
};

export default usePermission;
