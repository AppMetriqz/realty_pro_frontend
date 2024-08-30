import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { handleOnClose } from '@/common/utils/dialog';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SelectSharedController } from '@/common/components/UI/textField/SelectShared';
import { UserRoles } from '@/common/constants';

type Props = {
  isEdit?: boolean;
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: any;
};

export const DialogCreateEditUser = ({
  isEdit = false,
  open,
  onClose,
  usePageProps,
}: Props) => {
  const { userHookForm } = usePageProps;

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={userHookForm.handleSubmit(usePageProps.onSubmitUser)}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        {isEdit ? 'Editar' : 'Nuevo'}&nbsp;Usuario
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '40px' }}
      >
        <Grid container spacing={5} xs={12}>
          <Grid item xs={12} md={6}>
            <SelectSharedController
              label={'Rol'}
              name={'role_id'}
              isRequired
              options={UserRoles}
              hookForm={userHookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Nombre'}
              name={'first_name'}
              isRequired
              hookForm={userHookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Apellido'}
              name={'last_name'}
              isRequired
              hookForm={userHookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Correo electrónico'}
              name={'email'}
              isRequired
              hookForm={userHookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Contraseña'}
              name={'password'}
              isRequired
              hookForm={userHookForm}
              textFieldProps={{
                type: usePageProps.showPassword ? 'text' : 'password',
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={usePageProps.handleClickShowPassword}
                        edge="end"
                      >
                        {usePageProps.showPassword ? (
                          <VisibilityOff style={{ color: '#000' }} />
                        ) : (
                          <Visibility style={{ color: '#000' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Teléfono'}
              name={'phone_number'}
              hookForm={userHookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Número de identidad'}
              name={'national_id'}
              hookForm={userHookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: '40px' }}>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => onClose(false)}
        >
          Cancelar
        </Button>
        <Button sx={{ marginLeft: '25px' }} variant="contained" type="submit">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
