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

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: any;
};

export const DialogUpdatePassword = ({
  open,
  onClose,
  usePageProps,
}: Props) => {
  const { userPasswordHookForm } = usePageProps;

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={userPasswordHookForm.handleSubmit(
        usePageProps.onSubmitChangePassword
      )}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        Actualizar Contraseña
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '40px' }}
      >
        <Grid container spacing={5} xs={12}>
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Contraseña Actual'}
              name={'oldPassword'}
              isRequired
              hookForm={userPasswordHookForm}
              textFieldProps={{
                type: usePageProps.showCurrentPassword ? 'text' : 'password',
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={usePageProps.handleClickShowCurrentPassword}
                        edge="end"
                      >
                        {usePageProps.showCurrentPassword ? (
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
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Nueva Contraseña'}
              name={'password'}
              isRequired
              hookForm={userPasswordHookForm}
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
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Confirmar Contraseña'}
              name={'cpassword'}
              isRequired
              hookForm={userPasswordHookForm}
              textFieldProps={{
                type: usePageProps.showCPassword ? 'text' : 'password',
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={usePageProps.handleClickShowCPassword}
                        edge="end"
                      >
                        {usePageProps.showVPassword ? (
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
