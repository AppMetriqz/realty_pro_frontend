'use client';
import { Grid, Box, Card } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import AuthLogin from './AuthLogin';
import bg from '../../../public/images/backgrounds/bg_realstate.jpg';
import { styled } from '@mui/material/styles';
import React from 'react';
import useLogin from '@/app/login/useLogin';
import { withAuthentication } from '@/common/middleware';

const Login2 = () => {
  const uLogin = useLogin();

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={'column'}
      >
        <BoxBackground>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={92}
            width={'100%'}
          >
            <Logo />
          </Box>

          <Grid
            container
            spacing={0}
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Grid
              item
              xs={10}
              sm={10}
              lg={4}
              xl={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CardAuth elevation={9}>
                <AuthLogin {...uLogin} />
              </CardAuth>
            </Grid>
          </Grid>
        </BoxBackground>
      </Box>
    </PageContainer>
  );
};

const BoxBackground = styled(Box)({
  background: `linear-gradient(270deg, rgba(0, 0, 0, 0.00) 62.78%, #000 102.53%), linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.65) 100%), url(${bg.src}) lightgray 50% / cover no-repeat`,
  height: '100vh',
  width: '100%',
  paddingBottom: 56,
  paddingTop: 52,
});

const CardAuth = styled(Card)({
  padding: 32,
  zIndex: 1,
  width: '100%',
  height: '100%',
  maxWidth: '620px',
  borderRadius: 16,
  border: '2px solid rgba(255, 255, 255, 0.30)',
  background:
    'linear-gradient(124deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%)',
  backdropFilter: 'blur(12px)',
});

export default withAuthentication(Login2, 'loggedIn');
