import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { handleOnClose } from '@/common/utils/dialog';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: any;
};

export const DialogFreeDelete = ({
  open,
  onClose,
  usePageProps,
}: Props) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={usePageProps.onSubmitDelete}
    >
      <DialogTitle sx={{ py: '25px', px: '20px' }} fontSize={'18px'}>
        <>
          ¿Seguro que desea realizar esta operación?
        </>
      </DialogTitle>
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
