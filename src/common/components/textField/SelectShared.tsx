import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Select,
  TextFieldProps,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Colors } from '@/common/constants/general';
import { Controller } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import { getHelperText, getHelperTextFormState } from '@/common/utils/formHook';
import _ from 'lodash';
import { AliasesCSSProperties } from '@mui/system';
const primaryColor = Colors.primary;

export interface SelectSharedControllerProps {
  name: string;
  label?: string;
  options: any[];
  hookForm: UseFormReturn<any>;
  textFieldProps?: TextFieldProps;
  labelStyle?: AliasesCSSProperties;
}

export const SelectShared = styled(Select)({});

export const SelectSharedController: FC<SelectSharedControllerProps> = (
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
          <Select
            sx={{ '.MuiSelect-outlined': { padding: '11px 14px' } }}
            {...field}
            {...getHelperText(fieldState.error)}
            fullWidth
          >
            {props.options.map((option) => (
              <MenuItem key={_.uniqueId(props.name)} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {getHelperTextFormState(props.hookForm.formState, props.name).error ? (
        <FormHelperText error={true}>
          {
            getHelperTextFormState(props.hookForm.formState, props.name)
              .helperText
          }
        </FormHelperText>
      ) : null}
    </>
  );
};
