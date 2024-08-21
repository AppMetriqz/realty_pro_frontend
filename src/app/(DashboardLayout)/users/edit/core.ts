import * as yup from 'yup';
import { appDescriptions } from '@/common/constants/appDescriptions';

export interface FormInput {
  ID_PortalB2BUsuario?: number | undefined;
  Nombre: string;
  Apellido: string;
  Email: string;
  Contrasena: string;
  Permisos: number[];
  AreaTrabajo?: string;
  ID_Cliente?: number | undefined;
  Cliente?: object | null;
}

export const formDefaultValues = {
  ID_PortalB2BUsuario: undefined,
  Nombre: '',
  Apellido: '',
  Email: '',
  Contrasena: '',
  AreaTrabajo: '',
  ID_Cliente: undefined,
  Permisos: [],
  Cliente: null,
};

export const validationSchema = yup.object({
  // ID_PortalB2BUsuario: yup.number().required(appDescriptions.FieldRequired),
  Nombre: yup.string().required(appDescriptions.FieldRequired),
  Apellido: yup.string().required(appDescriptions.FieldRequired),
  Email: yup
    .string()
    .required(appDescriptions.FieldRequired)
    .email(appDescriptions.isEmail),
  Contrasena: yup.string().required(appDescriptions.FieldRequired),
  AreaTrabajo: yup.string(),
  Permisos: yup.array().of(yup.number()),
  ID_Cliente: yup.number().required(appDescriptions.FieldRequired),
});
