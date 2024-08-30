import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { handleOnClose } from '@/common/utils/dialog';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: any;
  name: string;
};

export const DialogCancelSell = ({
  open,
  onClose,
  usePageProps,
  name,
}: Props) => {
  const { cancelSellHookForm } = usePageProps;
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={cancelSellHookForm.handleSubmit(
        usePageProps.onSubmitCancelSale
      )}
    >
      <DialogTitle sx={{ py: '25px', px: '20px' }} fontSize={'18px'}>
        <>
          Cancelar {usePageProps.selectedUnits.length > 0 ? 'Ventas' : 'Venta'}:
          <span style={{ fontWeight: '600' }}>
            {name ? ` ${name}` : null}&nbsp;
            {usePageProps.selectedUnits?.length > 0
              ? `(${usePageProps.selectedUnits.length})`
              : null}
          </span>
        </>
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '20px' }}
      >
        <Grid container xs={12}>
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Nota'}
              name={'notes'}
              isRequired
              hookForm={cancelSellHookForm}
              labelStyle={{ mb: '10px' }}
              textFieldProps={{
                multiline: true,
                rows: 6,
                fullWidth: true,
              }}
            />
          </Grid>
          <Typography
            sx={{ width: '100%' }}
            textAlign={'center'}
            mt={3}
            fontSize="16px"
          >
            Si cancelas esta venta, cualquier&nbsp;
            <span style={{ fontWeight: '600' }}>plan de pago</span> <br />
            asociado con esta venta sera&nbsp;
            <span style={{ fontWeight: '600' }}>cancelado</span>.
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: '20px' }}>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => onClose(false)}
        >
          Cancelar
        </Button>
        <Button
          sx={{ marginLeft: '25px' }}
          color="error"
          variant="contained"
          type="submit"
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
