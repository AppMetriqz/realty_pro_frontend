import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Typography,
  CircularProgress,
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import { IconMenu } from '@tabler/icons-react';
import { apiAuth } from '@/api';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const authUser = apiAuth.useCurrentUser();
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    paddingTop: 10,
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    borderBottom: '1px solid #E7E7E7',
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Stack spacing={0.5} pr={1} direction="column" alignItems="flex-end">
            {authUser.isLoading ? (
              <Grid justifyContent={'center'} item xs={12}>
                <CircularProgress sx={{ color: '#000' }} />
              </Grid>
            ) : (
              <Typography color={'#505050'} fontWeight={400}>
                ¡Bienvenido&nbsp;
                <span style={{ fontWeight: 700 }}>{authUser.first_name}</span>!
                Realty Dominicana
              </Typography>
            )}
          </Stack>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
