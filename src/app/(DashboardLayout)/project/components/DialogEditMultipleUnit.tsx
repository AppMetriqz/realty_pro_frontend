import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import {
  MultipleUnitStatus,
  UnitCondicionType,
} from '@/common/constants/app-config';
import { TextFieldSharedController } from '@/common/components/textField/TextFieldShared';
import { SelectSharedController } from '@/common/components/textField/SelectShared';
import { UsePageProjectAvailableProps } from './ProjectAvailable/usePage';
import { formatCurrency } from '@/common/utils/numericHelpers';
import { handleOnClose } from '@/common/utils/dialog';

type Props<T> = {
  open: boolean;
  onClose: () => void;
  usePageProps: UsePageProjectAvailableProps;
  selectedUnits: readonly T[];
  hasError: boolean;
  setMultipleUpdateHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DialogEditMultipleUnit = <T,>({
  open,
  onClose,
  usePageProps,
  selectedUnits,
  hasError,
  setMultipleUpdateHasError,
}: Props<T>) => {
  const { multipleUnitHookForm } = usePageProps;
  const isPlot = multipleUnitHookForm.watch('type') === 'plot';

  if (
    multipleUnitHookForm.watch('condition') ||
    multipleUnitHookForm.watch('price') ||
    multipleUnitHookForm.watch('price_per_meter') ||
    multipleUnitHookForm.watch('status')
  ) {
    setMultipleUpdateHasError(false);
  }

  const onBlurPrice = () => {
    const price = multipleUnitHookForm.watch('price');
    multipleUnitHookForm.setValue(
      'price',
      price ? formatCurrency(parseFloat(price.replaceAll(/[$,]/gi, ''))) : ''
    );
  };

  const onBlurPricePerMeter = () => {
    const pricePerMeter = multipleUnitHookForm.watch('price_per_meter');
    multipleUnitHookForm.setValue(
      'price_per_meter',
      pricePerMeter
        ? formatCurrency(parseFloat(pricePerMeter.replaceAll(/[$,]/gi, '')))
        : ''
    );
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={multipleUnitHookForm.handleSubmit(
        usePageProps.onSubmitMultipleUnit
      )}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        Editar inmuebles&nbsp;
        <span style={{ fontWeight: 600 }}>({selectedUnits.length})</span>
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '40px' }}
      >
        <Grid container spacing={5} xs={12}>
          {isPlot ? (
            <Grid item xs={12} md={6}>
              <TextFieldSharedController
                label={'Precio por metro:'}
                name={'price_per_meter'}
                onBlur={onBlurPricePerMeter}
                hookForm={multipleUnitHookForm}
                labelStyle={{ mb: '15px' }}
              />
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <TextFieldSharedController
                label={'Precio:'}
                name={'price'}
                onBlur={onBlurPrice}
                hookForm={multipleUnitHookForm}
                labelStyle={{ mb: '15px' }}
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <SelectSharedController
              label={'Estatus:'}
              name={'status'}
              options={MultipleUnitStatus}
              hookForm={multipleUnitHookForm}
              labelStyle={{ mb: '15px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectSharedController
              label={'Condición:'}
              options={UnitCondicionType}
              name={'condition'}
              hookForm={multipleUnitHookForm}
              labelStyle={{ mb: '15px' }}
            />
          </Grid>
          {hasError ? (
            <Grid item xs={12}>
              <Typography variant="body1" color="error">
                No has actualizado ningun campo.
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: '40px' }}>
        <Button variant="contained" color="inherit" onClick={onClose}>
          Cancelar
        </Button>
        <Button sx={{ marginLeft: '25px' }} variant="contained" type="submit">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
