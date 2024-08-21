import React, { useCallback } from 'react';
import * as yup from 'yup';
import * as _ from 'lodash';
import { FieldError, FieldValues, FormState } from 'react-hook-form';

export const useYupValidationResolver = (validationSchema: yup.Schema) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export const getHelperText = (
  error?: FieldError | undefined
): { error: boolean; helperText: string | undefined } => {
  if (!_.isUndefined(error)) {
    return {
      error: true,
      helperText: error.message,
    };
  }
  return {
    error: false,
    helperText: undefined,
  };
};

export const getHelperTextFormState = (
  formState: FormState<FieldValues>,
  name: string
): { error: boolean; helperText: string | undefined } => {
  if (
    !_.isUndefined(formState.errors) &&
    !_.isUndefined(formState.errors[name])
  ) {
    let helperText: any = formState?.errors[name]?.message;
    return {
      error: true,
      helperText: helperText,
    };
  }
  return {
    error: false,
    helperText: undefined,
  };
};

export const getHelperTextOld = (field: string, fieldErrors: any) => {
  if (!_.isUndefined(fieldErrors[field])) {
    return {
      error: true,
      helperText: fieldErrors[field].message,
    };
  }
  return {
    error: false,
    helperText: undefined,
  };
};
