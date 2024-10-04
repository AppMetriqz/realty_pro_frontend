import React, { FC, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TextField } from '@mui/material';
import { Colors } from '@/common/constants/general';
import { Controller } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import { getHelperText } from '@/common/utils/formHook';
import _ from 'lodash';
import { AliasesCSSProperties } from '@mui/system';

export interface TextFieldSharedControllerProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  hookForm: UseFormReturn<any>;
  textFieldProps?: TextFieldProps;
  labelStyle?: AliasesCSSProperties;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
// Define the props type if needed
type TextFieldProps = React.ComponentProps<typeof TextField>;

export const TextFieldSharedLogin = styled(
  forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => (
    <TextField ref={ref} {...props} />
  ))
)(({ theme }) => ({
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '.MuiOutlinedInput-input': {
    color: '#fff',
  },
}));

export const TextFieldShared = styled(TextField)({});

export const TextFieldSharedController: FC<TextFieldSharedControllerProps> = ({
  name,
  label,
  isRequired = false,
  disabled,
  hookForm,
  textFieldProps,
  labelStyle,
  onBlur,
}) => {
  return (
    <>
      {!_.isUndefined(label) && _.size(label) > 0 && (
        <Typography {...labelStyle}>
          {label}:&nbsp;
          {isRequired ? <span style={{ color: 'red' }}>*</span> : null}
        </Typography>
      )}
      <Controller
        name={name}
        control={hookForm.control}
        render={({ field, fieldState }) => (
          <TextFieldShared
            fullWidth
            autoComplete="off"
            disabled={disabled}
            {...field}
            {...textFieldProps}
            {...getHelperText(fieldState.error)}
            onBlur={onBlur}
          />
        )}
      />
    </>
  );
};
