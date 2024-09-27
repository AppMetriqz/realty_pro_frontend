import React, { useContext } from 'react';
import { apiAuth } from '@/api';
import { useRouter } from 'next/navigation';
import { ExceptionCatchResponse } from '@/common/exceptions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useYupValidationResolver } from '@/common/utils/formHook';
import { LoginFormInput, validationSchema } from '@/app/login/core';
import Cookies from 'js-cookie';
import _ from 'lodash';

export default function useLogin() {
  const resolver = useYupValidationResolver(validationSchema);

  const {
    control,
    formState: { errors: fieldErrors },
    handleSubmit,
    setValue,
  } = useForm<LoginFormInput>({
    resolver,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const useSignIn = apiAuth.useSignIn();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [rememberMe, setRememberMe] = React.useState(false);

  React.useEffect(() => {
    router.prefetch('/');
  }, [router]);

  React.useEffect(() => {
    const isRememberMe = Cookies.get('rememberMe') === '1';
    if (isRememberMe) {
      const userSaved: any = Cookies.get('user');
      if (userSaved && !_.isEmpty(userSaved)) {
        setValue('email', JSON.parse(userSaved).email);
      }
    }
    setRememberMe(isRememberMe);
  }, []);

  const onLogin: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      const response = await useSignIn.mutateAsync({
        email: data.email,
        password: data.password,
      });
      if (rememberMe) {
        Cookies.set(
          'user',
          JSON.stringify({
            email: data.email,
            password: data.password,
          })
        );
      }
      Cookies.set('rememberMe', rememberMe ? '1' : '0');
    } catch (error: any) {
      ExceptionCatchResponse(error);
    }
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  return {
    control,
    fieldErrors,
    showPassword,
    handleClickShowPassword,
    onLogin: handleSubmit(onLogin),
    rememberMe,
    handleRememberMeChange,
  };
}
