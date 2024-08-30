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
  type?: string;
  name: string;
};

export const DialogDelete = ({
  open,
  onClose,
  usePageProps,
  type = 'Venta',
  name,
}: Props) => {
  const { deleteHookForm } = usePageProps;
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={deleteHookForm.handleSubmit(usePageProps.onSubmitDelete)}
    >
      <DialogTitle sx={{ py: '25px', px: '20px' }} fontSize={'18px'}>
        <>
          Borrar {type}:
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
              hookForm={deleteHookForm}
              labelStyle={{ mb: '10px' }}
              textFieldProps={{
                multiline: true,
                rows: 6,
                fullWidth: true,
              }}
            />
          </Grid>
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
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
