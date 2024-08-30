import React, { FC, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Select,
  TextFieldProps,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import { getHelperText, getHelperTextFormState } from '@/common/utils/formHook';
import _ from 'lodash';
import { AliasesCSSProperties } from '@mui/system';

export interface SelectSharedControllerProps {
  name: string;
  isRequired?: boolean;
  label?: string | ReactElement;
  options: any[];
  hookForm: UseFormReturn<any>;
  labelStyle?: AliasesCSSProperties;
  disabled?: boolean;
}

export const SelectShared = styled(Select)({});

export const SelectSharedController: FC<SelectSharedControllerProps> = ({
  name,
  isRequired,
  label,
  options,
  hookForm,
  labelStyle,
  disabled,
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
          <Select
            sx={{ '.MuiSelect-outlined': { padding: '11px 14px' } }}
            {...field}
            {...getHelperText(fieldState.error)}
            fullWidth
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem key={_.uniqueId(name)} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {getHelperTextFormState(hookForm.formState, name).error ? (
        <FormHelperText error={true}>
          {getHelperTextFormState(hookForm.formState, name).helperText}
        </FormHelperText>
      ) : null}
    </>
  );
};
