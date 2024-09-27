export type PermissionType = {
  dashboard: {
    canView: boolean;
    canAssignSales: boolean;
    canAssignPaymentPlan: boolean;
  };
  paymentPlan: { canView: boolean };
  finance: { canView: boolean };
  project: { canView: boolean; canAdd: boolean; canEdit: boolean };
  sale: { canView: boolean; canDelete: boolean };
  unit: {
    canView: boolean;
    canSale: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canCancel: boolean;
  };
  contact: { canView: boolean; canAdd: boolean; canEdit: boolean };
  user: { canView: boolean; canAdd: boolean; canEdit: boolean };
  setting: {
    canView: boolean;
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
  };
};
