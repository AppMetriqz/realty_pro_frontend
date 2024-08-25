import React from 'react';
import {styled} from '@mui/material/styles';
import {Button} from '@mui/material';

export const DateTimeShared = styled((props: any) => <Button {...props} />)(({theme}) => ({
    height: 56,
    color:"#fff",
    fontSize:16,
    borderRadius:4,
    textTransform: "none",
    backgroundColor:"#9E0B0F",
    '&:hover': {
        backgroundColor: 'rgba(158,11,15,0.8)',
        boxShadow: 'none',
    },
}));

