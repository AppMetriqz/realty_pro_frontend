import React, { useState } from 'react';
import {
  Box,
  Menu,
  Stack,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import EsIcon from '../../../../../public/images/lang/es.svg';

const Language = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const LangStack = styled(Stack)(({ theme }) => ({
    padding: '4px 8px 4px 4px',
    gap: 8,
    borderRadius: 32,
    border: '1px solid #D6D6D6',
  }));

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <LangStack direction="row" alignItems="center">
          <EsIcon />
          <Typography color={'#000'} fontWeight={700} fontSize={14}>
            ES
          </Typography>
        </LangStack>
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem>
          <ListItemIcon>
            <EsIcon />
          </ListItemIcon>
          <ListItemText>Español</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Language;
