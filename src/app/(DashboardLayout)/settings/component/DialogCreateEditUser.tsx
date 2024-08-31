import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid,} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { handleOnClose } from '@/common/utils/dialog';
import { SelectSharedController } from '@/common/components/UI/textField/SelectShared';
import {PropertyType} from '@/common/constants';

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
  const { propertyFeatureHookForm } = usePageProps;

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={propertyFeatureHookForm.handleSubmit(usePageProps.onSubmitUser)}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        {isEdit ? 'Editar' : 'Nueva'}&nbsp;Características
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '40px' }}
      >
        <Grid container spacing={5} xs={12}>

          <Grid item xs={12} md={6}>
            <TextFieldSharedController
                label={'Descripcción'}
                name={'description'}
                isRequired
                hookForm={propertyFeatureHookForm}
                labelStyle={{ mb: '10px' }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SelectSharedController
                label={'Carasteristicas'}
                name={'type'}
                isRequired
                options={[{value: "all", label: "Todos"}, ...PropertyType]}
                hookForm={propertyFeatureHookForm}
                labelStyle={{mb: '10px'}}
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
