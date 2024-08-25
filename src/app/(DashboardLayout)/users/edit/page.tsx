'use client';
import { Box, FormControlLabel, FormGroup, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import usePage from './usePage';
import { useWatch } from 'react-hook-form';
import React from 'react';
import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { CheckBoxShared } from '@/common/components/UI/textField/CheckBoxSharedWhite';

const UserEdit = () => {
  const router = useRouter();

  const { hookForm, onUserEdit, onClientSearchText } = usePage();

  const formValues = useWatch({ control: hookForm.control });

  const handlePermissionChange = (value: number) => {
    const currentPermissions = formValues.Permisos || [];
    if (currentPermissions.includes(value)) {
      hookForm.setValue(
        'Permisos',
        currentPermissions.filter((id: number) => id !== value)
      );
    } else {
      hookForm.setValue('Permisos', [...currentPermissions, value]);
    }
  };

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <Box
        sx={{
          padding: '30px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          margin: 'auto',
          backgroundColor: 'white',
          maxWidth: 1000,
        }}
      >
        <Typography
          fontWeight={700}
          fontSize={32}
          gutterBottom
          sx={{ marginBottom: '28px' }}
        >
          Editar usuario
        </Typography>
        <Typography
          fontWeight={700}
          fontSize={18}
          gutterBottom
          sx={{ marginBottom: '18px' }}
        >
          Información del usuario
        </Typography>

        <form onSubmit={onUserEdit}>
          <Box sx={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
            <Box sx={{ flex: 1 }}>
              <TextFieldSharedController
                label={'Nombre*'}
                name={'Nombre'}
                hookForm={hookForm}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextFieldSharedController
                label={'Apellido*'}
                name={'Apellido'}
                hookForm={hookForm}
              />
            </Box>
          </Box>

          <Box sx={{ marginBottom: '10px' }}>
            <TextFieldSharedController
              label={'Email*'}
              name={'Email'}
              hookForm={hookForm}
            />
          </Box>

          <Box sx={{ marginBottom: '10px' }}>
            <TextFieldSharedController
              label={'Contraseña*'}
              name={'Contrasena'}
              hookForm={hookForm}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Box sx={{ flex: 1 }}>
              <TextFieldSharedController
                label={'Área de trabajo'}
                name={'AreaTrabajo'}
                hookForm={hookForm}
              />
            </Box>
          </Box>

          <Typography
            fontWeight={700}
            fontSize={18}
            gutterBottom
            sx={{ marginTop: '6px' }}
          >
            Acceso al sistema
          </Typography>
          <Typography fontWeight={400} fontSize={16} gutterBottom>
            Define qué parte del sistema tendrá acceso este usuario.
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={
                <CheckBoxShared
                  checked={formValues.Permisos?.includes(1)}
                  value={1}
                  onChange={() => handlePermissionChange(1)}
                />
              }
              label="Consumir y analizar datos"
            />
            <FormControlLabel
              control={
                <CheckBoxShared
                  checked={formValues.Permisos?.includes(2)}
                  value={2}
                  onChange={() => handlePermissionChange(2)}
                />
              }
              label="Crear, editar y cancelar reservas"
            />
            <FormControlLabel
              control={
                <CheckBoxShared
                  checked={formValues.Permisos?.includes(3)}
                  value={3}
                  onChange={() => handlePermissionChange(3)}
                />
              }
              label="Configurar espacio de marketing"
            />
            <FormControlLabel
              control={
                <CheckBoxShared
                  checked={formValues.Permisos?.includes(4)}
                  value={4}
                  onChange={() => handlePermissionChange(4)}
                />
              }
              label="Crear, editar y eliminar usuarios"
            />
          </FormGroup>

          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'space-between',
              marginTop: '18px',
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => router.back()}
              sx={{
                color: '#000',
                padding: '10px 0',
                borderColor: '#000',
                '&:hover': {
                  borderColor: '#000',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: '#9E0B0F',
                '&:hover': { backgroundColor: '#7a0b0c' },
              }}
            >
              Guardar cambios
            </Button>
          </Box>
        </form>
      </Box>
    </PageContainer>
  );
};

export default UserEdit;
