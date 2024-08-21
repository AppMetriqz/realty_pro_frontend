import { apiAuth, apiUser } from '@/api';
import { useYupValidationResolver } from '@/common/utils/formHook';
import React from 'react';
import { formDefaultValues, FormInput, validationSchema } from './core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ExceptionCatchResponse } from '@/common/exceptions';
import { UserPath } from '@/common/constants/routes';
import { CurrentUserDto } from '@/common/dto/auth';

export default function usePage() {
  const resolver = useYupValidationResolver(validationSchema);
  const router = useRouter();

  const hookForm = useForm<FormInput>({
    resolver,
    defaultValues: formDefaultValues,
  });

  const [clientSearchText, setClientSearchText] = React.useState<string>('');

  const currentUser: CurrentUserDto = apiAuth.useCurrentUser();

  const useQueryUsers = apiUser.useQueryUsers({ pageSize: 10, pageIndex: 0 });
  const useCreateUser = apiUser.useCreateUser();

  React.useEffect(() => {
    router.prefetch('/');
  }, [router]);

  const onUserAdd: SubmitHandler<FormInput> = async (data) => {
    try {
      await useQueryUsers.refetch();
      router.push(UserPath);
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onClientSearchText = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.value && target.value.length > 1) {
      setClientSearchText(target.value);
    }
  };

  return {
    hookForm,
    onUserAdd: hookForm.handleSubmit(onUserAdd),
    onClientSearchText,
  };
}
