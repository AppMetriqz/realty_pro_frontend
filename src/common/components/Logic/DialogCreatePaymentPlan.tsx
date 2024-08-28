import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { AutoCompleteSharedController } from '@/common/components/UI/textField/AutoCompleteShared';
import { GetContactDto } from '@/common/dto';
import { handleOnClose } from '@/common/utils/dialog';
import {
  formatCurrency,
  fromStringCurrencyToFloat,
  isValidNumberInput,
} from '@/common/utils/numericHelpers';
import { DateTime } from 'luxon';

type Props = {
  isResale?: boolean;
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: any;
};

export const DialogCreatePaymentPlan = ({
  isResale = false,
  open,
  onClose,
  usePageProps,
}: Props) => {
  const { paymentPlanHookForm } = usePageProps;

  const onBlurTotalAmount = () => {
    const totalAmount = paymentPlanHookForm.watch('total_amount');
    paymentPlanHookForm.setValue(
      'total_amount',
      formatCurrency(
        parseFloat((!!totalAmount ? totalAmount : '0').replaceAll(/[$,]/gi, ''))
      )
    );
  };

  const onBlurSeparationAmount = () => {
    const totalAmount = paymentPlanHookForm.watch('separation_amount');
    paymentPlanHookForm.setValue(
      'separation_amount',
      formatCurrency(
        parseFloat((!!totalAmount ? totalAmount : '0').replaceAll(/[$,]/gi, ''))
      )
    );
  };

  const calculatedInitialAmount =
    (parseInt(paymentPlanHookForm.watch('separation_rate')) / 100) *
      fromStringCurrencyToFloat(paymentPlanHookForm.watch('total_amount')) -
    fromStringCurrencyToFloat(paymentPlanHookForm.watch('separation_amount'));

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={paymentPlanHookForm.handleSubmit(
        usePageProps.onSubmitPaymentPlan
      )}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        Nuevo Plan de Pago {isResale ? '(Reventa)' : '(Inicial)'}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={5} xs={12}>
          {isResale ? (
            <Grid item xs={12} md={12}>
              <AutoCompleteSharedController
                keyId={'client_id'}
                keyName={'client_id'}
                isLoading={usePageProps.clientAutocompleteContacts.isLoading}
                getOptionLabel={(option: GetContactDto) =>
                  `${option.first_name} ${option.last_name}`
                }
                label={'Cliente:'}
                onInputChange={(value) =>
                  usePageProps.setClientDescription(value)
                }
                options={
                  usePageProps.clientAutocompleteContacts.data
                    ? usePageProps.clientAutocompleteContacts.data.map(
                        (contact: GetContactDto) => ({
                          ...contact,
                          client_id: contact.contact_id,
                        })
                      )
                    : []
                }
                hookForm={paymentPlanHookForm}
                labelStyle={{ mb: '10px' }}
                disableClearable={false}
              />
            </Grid>
          ) : null}
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Monto Total:'}
              name={'total_amount'}
              disabled={!isResale}
              onBlur={onBlurTotalAmount}
              textFieldProps={{
                onChange: (e) => {
                  if (
                    isValidNumberInput(e.target.value.replaceAll(/[$,]/gi, ''))
                  ) {
                    paymentPlanHookForm.setValue(
                      'total_amount',
                      e.target.value.replaceAll(/[$,]/gi, '') ?? 0
                    );
                  }
                },
              }}
              hookForm={paymentPlanHookForm}
              labelStyle={{ mb: '15px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Monto de Separación:'}
              name={'separation_amount'}
              onBlur={onBlurSeparationAmount}
              textFieldProps={{
                onChange: (e) => {
                  if (
                    isValidNumberInput(e.target.value.replaceAll(/[$,]/gi, ''))
                  ) {
                    paymentPlanHookForm.setValue(
                      'separation_amount',
                      e.target.value.replaceAll(/[$,]/gi, '') ?? 0
                    );
                  }
                },
              }}
              disabled={isResale}
              hookForm={paymentPlanHookForm}
              labelStyle={{ mb: '15px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Porciento de Inicial:'}
              name={'separation_rate'}
              hookForm={paymentPlanHookForm}
              textFieldProps={{
                type: 'number',
                InputProps: { endAdornment: '%' },
              }}
              disabled={isResale}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Cantidad de Cuotas:'}
              name={'payment_plan_numbers'}
              hookForm={paymentPlanHookForm}
              textFieldProps={{
                type: 'number',
                InputProps: { endAdornment: 'meses' },
              }}
              disabled={isResale}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Fecha de Separación:'}
              name={'separation_date'}
              hookForm={paymentPlanHookForm}
              textFieldProps={{ type: 'date' }}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Box
            px="40px"
            mt="40px"
            mb={'15px'}
            display={'flex'}
            flexDirection={'column'}
            columnGap={'10px'}
          >
            <Typography mb="30px" variant="body1">
              Monto del Inicial&nbsp;
              <span style={{ fontWeight: 700 }}>
                {usePageProps.selectedPaymentToAssign?.project
                  ? usePageProps.selectedPaymentToAssign.project.currency_type
                  : ''}
                {formatCurrency(calculatedInitialAmount)}
              </span>
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: 700 }}>
                {paymentPlanHookForm.watch('payment_plan_numbers')} cuotas
              </span>
              &nbsp;de&nbsp;
              <span style={{ fontWeight: 700 }}>
                {usePageProps.selectedPaymentToAssign?.project
                  ? usePageProps.selectedPaymentToAssign.project.currency_type
                  : ''}
                {formatCurrency(
                  calculatedInitialAmount /
                    parseInt(paymentPlanHookForm.watch('payment_plan_numbers'))
                )}
              </span>
              &nbsp; cada una iniciando&nbsp;
              <span style={{ fontWeight: 700 }}>
                {DateTime.fromISO(paymentPlanHookForm.watch('separation_date'))
                  .plus({ month: 1 })
                  .toLocaleString()}
              </span>
              &nbsp; y finalizando&nbsp;
              <span style={{ fontWeight: 700 }}>
                {DateTime.fromISO(paymentPlanHookForm.watch('separation_date'))
                  .plus({
                    month: parseInt(
                      paymentPlanHookForm.watch('payment_plan_numbers')
                    ),
                  })
                  .toLocaleString()}
              </span>
              .
            </Typography>
          </Box>
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
