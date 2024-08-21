import React from 'react';
import { Box, Typography, FormGroup, Stack } from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller } from 'react-hook-form';
import { getHelperTextOld } from '@/common/utils/formHook';
import { TextFieldSharedLogin } from '@/common/components/textField/TextFieldShared';
import { FormLabelShared } from '@/common/components/textField/FormLabelShared';
import { CheckBoxSharedWhite } from '@/common/components/textField/CheckBoxSharedWhite';
import { ButtonShared } from '@/common/components/button/ButtonShared';

const AuthLogin = (props: any) => (
  <form onSubmit={props.onLogin}>
    <Typography
      fontWeight={600}
      fontSize={24}
      color={'#fff'}
      style={{ marginBottom: 32 }}
    >
      Acceso a mi cuenta
    </Typography>

    <Stack>
      <Box>
        <Typography color={'#fff'} fontWeight={400} fontSize={14} mb="5px">
          Nombre de usuario o correo electrónico
        </Typography>
        <Controller
          name="email"
          control={props.control}
          render={({ field }) => (
            <TextFieldSharedLogin
              {...field}
              {...getHelperTextOld('email', props.fieldErrors)}
              fullWidth
            />
          )}
        />
      </Box>
      <Box mt="25px">
        <Typography color={'#fff'} fontWeight={400} fontSize={14} mb="5px">
          Contraseña
        </Typography>

        <Controller
          name="password"
          control={props.control}
          render={({ field }) => (
            <TextFieldSharedLogin
              {...field}
              {...getHelperTextOld('password', props.fieldErrors)}
              fullWidth
              type={props.showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={props.handleClickShowPassword}
                      edge="end"
                    >
                      {props.showPassword ? (
                        <VisibilityOff style={{ color: '#fff' }} />
                      ) : (
                        <Visibility style={{ color: '#fff' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormLabelShared
            control={
              <CheckBoxSharedWhite
                checked={props.rememberMe}
                onChange={props.handleRememberMeChange}
              />
            }
            label="Mantenerme conectado"
          />
        </FormGroup>
      </Stack>
    </Stack>
    <Box>
      <ButtonShared sx={{ py: '15px' }} fullWidth type="submit">
        Iniciar sesión
      </ButtonShared>
    </Box>
  </form>
);

export default AuthLogin;
