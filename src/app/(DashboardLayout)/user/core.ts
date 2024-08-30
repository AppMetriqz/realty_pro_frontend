import * as yup from 'yup';
import { ErrorMsg } from '@/common/constants/app-config';
import { CreateUserDto } from '@/common/dto';

export const deleteValidationSchema = yup.object({
  notes: yup.string().required(ErrorMsg.required),
});

export const deleteFormDefaultValues = {
  notes: '',
};

export const userValidationSchema = yup.object({
  first_name: yup.string().required(ErrorMsg.required),
  last_name: yup.string().required(ErrorMsg.required),
  email: yup.string().required(ErrorMsg.required),
  password: yup.string().required(ErrorMsg.required),
  role_id: yup.number().required(ErrorMsg.required),
});

export const userFormDefaultValues: CreateUserDto = {
  role_id: 4,
  first_name: '',
  last_name: '',
  phone_number: '',
  national_id: '',
  email: '',
  password: '',
};
