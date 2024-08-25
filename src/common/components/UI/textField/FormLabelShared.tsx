import React from 'react';
import {styled} from '@mui/material/styles';
import {FormControlLabel} from '@mui/material';

export const FormLabelShared = styled((props: any) => <FormControlLabel {...props} />)(({theme}) => ({
    ' & .MuiFormControlLabel-label': {
        color: "#fff",
        fontSize: 14,
        fontWeight: 400,
    },
}));


