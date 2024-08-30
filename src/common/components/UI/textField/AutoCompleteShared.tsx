import React, { Dispatch, FC, SetStateAction } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  TextFieldProps,
  Autocomplete,
  SxProps,
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { getHelperTextFormState } from '@/common/utils/formHook';
import _ from 'lodash';
import { AliasesCSSProperties } from '@mui/system';
import { TextFieldShared } from './TextFieldShared';

interface AutoCompleteSharedControllerProps {
  keyId: string;
  keyName: string;
  keyValue?: string;
  label?: string;
  disableClearable?: boolean;
  placeholder?: string;
  labelStyle?: AliasesCSSProperties;
  getOptionLabel?: (option: any) => string;
  value?: object | null;
  isNotValue?: boolean;
  isRequired?: boolean;
  options: any[];
  isLoading?: boolean;
  style?: React.CSSProperties;
  sx?: SxProps;
  hookForm?: UseFormReturn<any>;
  textFieldProps?: TextFieldProps;
  onInputChange?: Dispatch<SetStateAction<string>>;
  onSelected?: Dispatch<SetStateAction<any>>;
  disabled?: boolean;
}

const AutoCompleteStyled = styled(Autocomplete)({});

export const AutoCompleteSharedController: FC<
  AutoCompleteSharedControllerProps
> = ({
  keyId,
  keyName,
  keyValue,
  label,
  disableClearable,
  placeholder,
  labelStyle,
  isRequired = false,
  getOptionLabel,
  disabled = false,
  value,
  isNotValue,
  options,
  isLoading,
  style,
  sx,
  hookForm,
  textFieldProps,
  onInputChange,
  onSelected: onSelectedValue,
}) => {
  const id = keyId;
  const name = keyName;

  const [selected, onSelected] = React.useState(value);

  return (
    <>
      {!_.isUndefined(label) && _.size(label) > 0 && (
        <Typography {...labelStyle}>
          {label}:&nbsp;
          {isRequired ? <span style={{ color: 'red' }}>*</span> : null}
        </Typography>
      )}
      <AutoCompleteStyled
        options={options}
        loading={isLoading}
        style={style}
        disabled={disabled}
        sx={{
          ...sx,
          '& .MuiInputBase-root': { paddingY: '4px' },
        }}
        size={'medium'}
        disableClearable={
          disableClearable !== undefined ? disableClearable : true
        }
        getOptionLabel={
          getOptionLabel ? getOptionLabel : (option: any) => option[name]
        }
        onInputChange={(event) => {
          if (onInputChange) {
            const target = event?.target as HTMLInputElement;
            onInputChange(target?.value ?? '');
          }
        }}
        value={keyValue ? hookForm?.watch(keyValue) : selected}
        defaultValue={value}
        onChange={(event, newValue: any) => {
          if (!isNotValue) {
            onSelected(newValue);
          }
          if (onSelectedValue && newValue) {
            onSelectedValue(newValue);
          }
          if (!_.isNull(newValue)) {
            if (hookForm) {
              hookForm.setValue(id, newValue[id]);
              hookForm.clearErrors(id);
              if (keyValue) {
                hookForm.setValue(keyValue, newValue);
              }
            }
          } else {
            if (hookForm) {
              hookForm.setValue(id, undefined);
            }
          }
        }}
        renderInput={(params) => (
          <TextFieldShared
            {...params}
            {...textFieldProps}
            {...(hookForm
              ? getHelperTextFormState(hookForm.formState, id)
              : {})}
            fullWidth
            placeholder={placeholder}
            autoComplete="off"
          />
        )}
      />
    </>
  );
};
