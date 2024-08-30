import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { handleOnClose } from '@/common/utils/dialog';
import {
  formatCurrency,
  isValidNumberInput,
} from '@/common/utils/numericHelpers';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: any;
};

export const DialogCreatePayment = ({ open, onClose, usePageProps }: Props) => {
  const { paymentHookForm } = usePageProps;

  const onBlurTotalAmount = () => {
    const totalAmount = paymentHookForm.watch('amount');
    paymentHookForm.setValue(
      'amount',
      formatCurrency(
        parseFloat((!!totalAmount ? totalAmount : '0').replaceAll(/[$,]/gi, ''))
      )
    );
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={paymentHookForm.handleSubmit(usePageProps.onSubmitPayment)}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        Registrar Pago
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={5} xs={12}>
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Monto a pagar'}
              name={'amount'}
              isRequired
              onBlur={onBlurTotalAmount}
              textFieldProps={{
                onChange: (e) => {
                  if (
                    isValidNumberInput(e.target.value.replaceAll(/[$,]/gi, ''))
                  ) {
                    paymentHookForm.setValue(
                      'amount',
                      e.target.value.replaceAll(/[$,]/gi, '') ?? 0
                    );
                  }
                },
              }}
              hookForm={paymentHookForm}
              labelStyle={{ mb: '15px' }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Fecha de Pago'}
              name={'payment_made_at'}
              hookForm={paymentHookForm}
              textFieldProps={{ type: 'date' }}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Nota'}
              name={'notes'}
              hookForm={paymentHookForm}
              labelStyle={{ mb: '15px' }}
              textFieldProps={{
                multiline: true,
                rows: 6,
                fullWidth: true,
              }}
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
