import * as yup from 'yup';
import { appDescriptions } from '@/common/constants/appDescriptions';

export interface LoginFormInput {
  email: string;
  password: string;
}

export const validationSchema = yup.object({
  email: yup
    .string()
    .required(appDescriptions.FieldRequired)
    .email(appDescriptions.isEmail),
  password: yup.string().required(appDescriptions.FieldRequired),
});
