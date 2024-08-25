import { styled, alpha, SxProps } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import React, { FC } from 'react';
import SearchIcon from '@/icons/SearchIcon';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  border: '1px solid #E7E7E7',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    [theme.breakpoints.up('sm')]: {
      width: '17ch',
    },
  },
}));

const SearchInput: FC<{ sx?: SxProps; label: string }> = ({ sx, label }) => {
  return (
    <Search sx={sx}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={label}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchInput;
