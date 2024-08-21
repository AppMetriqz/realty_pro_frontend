import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TextField, TextFieldProps } from '@mui/material';
import { Colors } from '@/common/constants/general';
import { Controller } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import { getHelperText } from '@/common/utils/formHook';
import _ from 'lodash';
import { AliasesCSSProperties } from '@mui/system';

const primaryColor = Colors.primary;

export interface TextFieldSharedControllerProps {
  name: string;
  label?: string;
  disabled?: boolean;
  hookForm: UseFormReturn<any>;
  textFieldProps?: TextFieldProps;
  labelStyle?: AliasesCSSProperties;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const TextFieldSharedLogin = styled((props: any) => (
  <TextField {...props} />
))(({ theme }) => ({
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '.MuiOutlinedInput-input': {
    color: '#fff',
  },
}));

export const TextFieldShared = styled(TextField)({});

export const TextFieldSharedController: FC<TextFieldSharedControllerProps> = (
  props
) => {
  return (
    <>
      {!_.isUndefined(props.label) && _.size(props.label) > 0 && (
        <Typography {...props.labelStyle}>{props.label}</Typography>
      )}
      <Controller
        name={props.name}
        control={props.hookForm.control}
        render={({ field, fieldState }) => (
          <TextFieldShared
            fullWidth
            autoComplete="off"
            disabled={props.disabled}
            {...field}
            {...props.textFieldProps}
            {...getHelperText(fieldState.error)}
            onBlur={props.onBlur}
          />
        )}
      />
    </>
  );
};
