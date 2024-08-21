import React, { Dispatch, FC, SetStateAction } from 'react';
import CloseIcon from '@/icons/CloseIcon';
import { Chip, Box, SelectChangeEvent } from '@mui/material';

import { AutoCompleteSharedController } from '@/common/components/textField/AutoCompleteShared';

export interface SelectChipSharedProps {
  keyId: string;
  keyName: string;
  label?: string;
  placeholder?: string;
  options: any[];
  optionsSelected: any[];
  handleRemove: (e: SelectChangeEvent) => void;
  onInputChange: Dispatch<SetStateAction<string>>;
  onSelected?: Dispatch<SetStateAction<any>>;
}

export const SelectChipShared: FC<SelectChipSharedProps> = (props) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection={'column'}
        width={240}
        ml={'40px'}
        mb={'40px'}
        gap={'20px'}
        alignItems={'center'}
      >
        <AutoCompleteSharedController
          keyId={props.keyId}
          keyName={props.keyName}
          placeholder={props.placeholder}
          label={props.label}
          disableClearable={false}
          isNotValue={true}
          onInputChange={props.onInputChange}
          onSelected={props.onSelected}
          options={props.options}
          labelStyle={{ mb: '15px' }}
          style={{ width: 240 }}
        />

        <Box
          display="flex"
          width={'100%'}
          mt={'40px'}
          gap={'10px'}
          alignItems={'center'}
        >
          {props.optionsSelected.map((option) => (
            <Chip
              key={option[props.keyId]}
              color="secondary"
              label={option[props.keyName]}
              deleteIcon={
                <CloseIcon onClick={() => props.handleRemove(option)} />
              }
              onDelete={() => props.handleRemove(option)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
