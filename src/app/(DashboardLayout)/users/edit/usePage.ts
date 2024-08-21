import { apiUser } from '@/api';
import { useYupValidationResolver } from '@/common/utils/formHook';
import React from 'react';
import { formDefaultValues, FormInput, validationSchema } from './core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExceptionCatchResponse } from '@/common/exceptions';
import { UserPath } from '@/common/constants/routes';
import _ from 'lodash';

export default function usePage() {
  const resolver = useYupValidationResolver(validationSchema);
  const searchParams = useSearchParams();

  const hookForm = useForm<FormInput>({
    resolver,
    defaultValues: formDefaultValues,
  });

  const { setValue, reset } = hookForm;

  const [clientSearchText, setClientSearchText] = React.useState<string>('');

  const useQueryUsersById = apiUser.useQueryUsersById(searchParams.get('id'));
  const useUpdateUser = apiUser.useUpdateUser();
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const id = searchParams.get('id');
      if (!id) {
        return router.back();
      }
      if (useQueryUsersById.isSuccess) {
        const userData = useQueryUsersById.data;
        setValue('Nombre', userData.Nombre);
        setValue('Apellido', userData.Apellido);
        setValue('Email', userData.Email);
        setValue('Contrasena', '');
        setValue('AreaTrabajo', userData.AreaTrabajo || '');
        setValue('ID_Cliente', userData.Cliente?.ID_Cliente ?? null);
        setValue('Cliente', userData.Cliente ?? null);
        if (userData.Cliente) {
          setClientSearchText(userData.Cliente.Nombre);
        }
        setValue('Permisos', _.map(userData.Permisos, 'ID_PortalB2BPermiso'));
      }
    })();
  }, [useQueryUsersById.data, useQueryUsersById.isSuccess, setValue]);

  React.useEffect(() => {
    router.prefetch('/');
  }, [router]);

  const onUserEdit: SubmitHandler<FormInput> = async (data) => {
    try {
      router.push(UserPath);
    } catch (error: any) {
      ExceptionCatchResponse(error);
    }
  };

  const onClientSearchText = (event: React.SyntheticEvent) => {
    if (event && event.target) {
      const target = event.target as HTMLInputElement;
      if (target.value && target.value.length > 1) {
        setClientSearchText(target.value);
      }
    }
  };

  return {
    hookForm,
    onUserEdit: hookForm.handleSubmit(onUserEdit),
    onClientSearchText,
  };
}
