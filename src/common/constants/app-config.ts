export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const ErrorMsg = {
  required: 'Campo Requerido',
  cantBe0: 'Precio debe ser mayor de 0',
  arrayMin: 'Debe seleccionar al menos una',
  file: 'Se requiere archivo',
  match: 'El texto no coincide.',
  email: 'El correo eleconico no es valido.',
  phone: 'El télefono esta incompleto',
};

export const PropertyType = [
  { label: 'Casa', value: 'house' },
  { label: 'Apartamento', value: 'apartment' },
  { label: 'Terreno', value: 'plot' },
  { label: 'Comercial', value: 'commercial' },
];

export const UnitCondicionType = [
  { label: 'En Plano', value: 'drawing' },
  { label: 'En Construcción', value: 'building' },
  { label: 'Listo', value: 'ready' },
];

export const SaleStages = [
  { label: 'Separación', value: 'separation' },
  { label: 'Financiamiento', value: 'financed' },
  { label: 'Plan de Pago en Proceso', value: 'payment_plan_in_progress' },
  { label: 'Plan de Pago Finalizado', value: 'payment_plan_completed' },
];

export const UnitStatus = [
  { label: 'Disponible', value: 'available' },
  { label: 'Vendido', value: 'sold' },
  { label: 'Reservado', value: 'reserved' },
];

export const MultipleUnitStatus = [
  { label: 'Disponible', value: 'available' },
  { label: 'Reservado', value: 'reserved' },
];

export const CurrencyType = [
  { label: 'US$ Dollar', value: 'US' },
  { label: 'RD$ Peso', value: 'RD' },
];

export const ContactType = [
  { label: 'Vendedor', value: 'seller' },
  { label: 'Cliente', value: 'client' },
  { label: 'Oficina', value: 'office' },
  { label: 'Relacionado ', value: 'related' },
];

export const MaritalStatusType = [
  { label: 'Soltero', value: 'single' },
  { label: 'Casado', value: 'married' },
  { label: 'Divorciado', value: 'divorced' },
  { label: 'Viudo', value: 'widowed' },
  { label: 'Unión Civil', value: 'civil_union' },
  { label: 'Separado', value: 'separated' },
  { label: 'Unión Libre', value: 'cohabitant' },
];

export const ContactMethodType = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'Pagina web', value: 'web_page' },
  { label: 'Vendedor', value: 'seller' },
  { label: 'Referencia ', value: 'reference' },
  { label: 'Sin Vía ', value: 'none' },
];

export const PaymentPlanType = [
  {
    label: 'Reventa',
    value: 'resale',
  },
  { label: 'Venta', value: 'sale' },
];

export const UserRoles = [
  { value: 1, label: 'Super Administrador' },
  { value: 2, label: 'Administrador' },
  { value: 3, label: 'Ejecutor' },
  { value: 4, label: 'Visitante' },
];

export const PropertyFeaturesType = [
  { value: 'house', label: 'Super Administrador' },
  { value: 'apartment', label: 'Administrador' },
  { value: 'plot', label: 'Ejecutor' },
  { value: 'commercial', label: 'Visitante' },
];

export enum ROL {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  EXECUTOR = 3,
  VISITOR = 4,
}
