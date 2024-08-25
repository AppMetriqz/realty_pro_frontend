import { alpha, Toolbar, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

interface EnhancedTableToolbarProps {
  numSelected?: number;
  headTitle: string;
  multiSelectActions?: ReactElement;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, headTitle, multiSelectActions } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected &&
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
      }}
    >
      {numSelected && numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Seleccionada{numSelected > 1 ? 's' : ''}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {headTitle}
        </Typography>
      )}
      {numSelected && numSelected > 0 && multiSelectActions
        ? multiSelectActions
        : null}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
