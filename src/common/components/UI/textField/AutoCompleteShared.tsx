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
  options: any[];
  isLoading?: boolean;
  style?: React.CSSProperties;
  sx?: SxProps;
  hookForm?: UseFormReturn<any>;
  textFieldProps?: TextFieldProps;
  onInputChange?: Dispatch<SetStateAction<string>>;
  onSelected?: Dispatch<SetStateAction<any>>;
}

const AutoCompleteStyled = styled(Autocomplete)({});

export const AutoCompleteSharedController: FC<
  AutoCompleteSharedControllerProps
> = (props) => {
  const id = props.keyId;
  const name = props.keyName;
  const keyValue = props.keyValue;

  const [selected, onSelected] = React.useState(props.value);

  return (
    <>
      {!_.isUndefined(props.label) && _.size(props.label) > 0 && (
        <Typography {...props.labelStyle}>{props.label}</Typography>
      )}
      <AutoCompleteStyled
        options={props.options}
        loading={props.isLoading}
        style={props.style}
        sx={{
          ...props.sx,
          '& .MuiInputBase-root': { paddingY: '4px' },
        }}
        size={'medium'}
        disableClearable={
          props.disableClearable !== undefined ? props.disableClearable : true
        }
        getOptionLabel={
          props.getOptionLabel
            ? props.getOptionLabel
            : (option: any) => option[name]
        }
        // isOptionEqualToValue={(option: any, value: any) =>
        //   option[id] === value[id]
        // }
        onInputChange={(event) => {
          if (props.onInputChange) {
            const target = event?.target as HTMLInputElement;
            props.onInputChange(target?.value ?? "");
          }
        }}
        value={keyValue? props.hookForm?.watch(keyValue) : selected}
        defaultValue={props.value}
        onChange={(event, newValue: any) => {
          if (!props.isNotValue) {
            onSelected(newValue);
          }
          if (props.onSelected && newValue) {
            props.onSelected(newValue);
          }
          if (!_.isNull(newValue)) {
            if (props.hookForm) {
              props.hookForm.setValue(id, newValue[id]);
              props.hookForm.clearErrors(id);
              if (keyValue){
                props.hookForm.setValue(keyValue, newValue);
              }
            }
          } else {
            if (props.hookForm) {
              props.hookForm.setValue(id, undefined);
            }
          }
        }}
        renderInput={(params) => (
          <TextFieldShared
            {...params}
            {...props.textFieldProps}
            {...(props.hookForm
              ? getHelperTextFormState(props.hookForm.formState, id)
              : {})}
            fullWidth
            placeholder={props.placeholder}
            autoComplete="off"
          />
        )}
      />
    </>
  );
};
