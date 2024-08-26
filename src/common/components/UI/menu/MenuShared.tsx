import {
  Fade,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { FC, ReactElement, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export type ActionType = {
  id: string | number;
  onClick: () => void;
  icon: ReactElement;
  label: string;
  isDisabled?: boolean;
};

type MenuSharedType = {
  actions: Array<ActionType>;
  isDisabled?: boolean;
};

const MenuShared: FC<MenuSharedType> = ({ actions, isDisabled = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={Boolean(anchorEl) ? 'long-menu' : undefined}
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={isDisabled}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={`${action.id}-${index}`}
            disabled={action.isDisabled || false}
            onClick={() => {
              action.onClick();
              handleClose();
            }}
          >
            {action.icon ? <ListItemIcon>{action.icon}</ListItemIcon> : null}
            <Typography variant="inherit">{action.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuShared;
