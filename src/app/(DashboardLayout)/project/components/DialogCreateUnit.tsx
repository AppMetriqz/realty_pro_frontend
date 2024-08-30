import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import { UnitCondicionType, UnitStatus } from '@/common/constants/app-config';
import { ProjectFeatures } from '@/app/(DashboardLayout)/project/components/ProjectFeatures';
import { Cover } from '@/app/(DashboardLayout)/project/components/Cover';
import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { SelectSharedController } from '@/common/components/UI/textField/SelectShared';
import {
  formatCurrency,
  isValidNumberInput,
} from '@/common/utils/numericHelpers';
import { CreateUnitProjectProps } from '../[slug]/usePage';
import { handleOnClose } from '@/common/utils/dialog';

type Props<T> = {
  isEdit?: boolean;
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: T;
};

export const DialogCreateUnit = <T extends CreateUnitProjectProps>({
  isEdit = false,
  open,
  onClose,
  usePageProps,
}: Props<T>) => {
  const { hookForm } = usePageProps;
  const isPlot =
    hookForm.watch('type') === 'plot' || hookForm.getValues('type') === 'plot';

  if (isPlot) {
    hookForm.setValue(
      'price',
      formatCurrency(
        parseFloat(hookForm.watch('meters_of_land') || '0') *
          parseFloat(hookForm.watch('price_per_meter') || '0')
      )
    );
  }

  const onBlurPrice = () => {
    const price = hookForm.watch('price');
    hookForm.setValue(
      'price',
      formatCurrency(
        parseFloat((!!price ? price : '0').replaceAll(/[$,]/gi, ''))
      )
    );
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={hookForm.handleSubmit(usePageProps.onSubmitUnit)}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        {isEdit ? 'Editar' : 'Nueva'} Unidad
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '40px' }}
      >
        <Grid container spacing={5} xs={12}>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Nombre de la Unidad'}
              name={'name'}
              isRequired
              hookForm={hookForm}
              labelStyle={{ mb: '15px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectSharedController
              label={'Condición'}
              options={UnitCondicionType}
              name={'condition'}
              isRequired
              hookForm={hookForm}
              labelStyle={{ mb: '15px' }}
            />
          </Grid>
          {isPlot ? null : (
            <>
              <Grid item xs={12} md={6}>
                <TextFieldSharedController
                  label={'Niveles'}
                  name={'levels_qty'}
                  isRequired
                  hookForm={hookForm}
                  textFieldProps={{ type: 'number' }}
                  labelStyle={{ mb: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldSharedController
                  label={'Niveles en que se encuentra'}
                  name={'level'}
                  isRequired
                  hookForm={hookForm}
                  textFieldProps={{ type: 'number' }}
                  labelStyle={{ mb: '15px' }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Metros del Terreno'}
              name={'meters_of_land'}
              isRequired
              hookForm={hookForm}
              textFieldProps={{
                type: 'number',
                InputProps: { endAdornment: 'mts2' },
              }}
              labelStyle={{ mb: '15px' }}
            />
          </Grid>
          {isPlot ? (
            <Grid item xs={12} md={6}>
              <TextFieldSharedController
                label={'Precio por metro'}
                name={'price_per_meter'}
                isRequired
                hookForm={hookForm}
                textFieldProps={{ type: 'number' }}
                labelStyle={{ mb: '15px' }}
              />
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <TextFieldSharedController
                label={'Metros de Construcción'}
                name={'meters_of_building'}
                isRequired
                hookForm={hookForm}
                textFieldProps={{
                  type: 'number',
                  InputProps: { endAdornment: 'mts2' },
                }}
                labelStyle={{ mb: '15px' }}
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Precio'}
              name={'price'}
              isRequired
              disabled={isPlot}
              onBlur={onBlurPrice}
              textFieldProps={{
                onChange: (e) => {
                  if (
                    isValidNumberInput(e.target.value.replaceAll(/[$,]/gi, ''))
                  ) {
                    hookForm.setValue(
                      'price',
                      e.target.value.replaceAll(/[$,]/gi, '') ?? 0
                    );
                  }
                },
              }}
              hookForm={hookForm}
              labelStyle={{ mb: '15px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectSharedController
              label={'Estatus'}
              name={'status'}
              isRequired
              options={UnitStatus}
              hookForm={hookForm}
              labelStyle={{ mb: '15px' }}
              disabled={hookForm.watch('status') === 'sold' && isEdit}
            />
          </Grid>
          {isPlot ? null : (
            <>
              <Grid item xs={12} md={6}>
                <TextFieldSharedController
                  label={'Habitaciones'}
                  name={'rooms'}
                  isRequired
                  hookForm={hookForm}
                  textFieldProps={{ type: 'number' }}
                  labelStyle={{ mb: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldSharedController
                  label={'Baños'}
                  name={'bathrooms'}
                  isRequired
                  hookForm={hookForm}
                  textFieldProps={{ type: 'number' }}
                  labelStyle={{ mb: '15px' }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Descripción'}
              name={'description'}
              hookForm={hookForm}
              labelStyle={{ mb: '15px' }}
              textFieldProps={{
                multiline: true,
                rows: 6,
                fullWidth: true,
              }}
            />
          </Grid>

          <Grid item container xs={12} md={12} spacing={'30px'}>
            <ProjectFeatures usePageProps={usePageProps} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Cover usePageProps={usePageProps} />
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
