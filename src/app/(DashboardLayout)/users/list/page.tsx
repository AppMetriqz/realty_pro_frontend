'use client';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const UserList = () => {

  return (
    <PageContainer title="Usuarios" description="this is Sample page">
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems={'center'}
        mb={3} 
      >
        <Typography fontWeight={700} fontSize={40}>
          Usuarios
        </Typography>
      </Stack>                       
      <Box sx={{ display: 'flex' }}></Box>
    </PageContainer>
  );
};

export default UserList;
