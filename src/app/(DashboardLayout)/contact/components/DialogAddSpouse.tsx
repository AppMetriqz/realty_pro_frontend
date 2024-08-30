import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { AutoCompleteSharedController } from '@/common/components/UI/textField/AutoCompleteShared';
import { GetContactDto } from '@/common/dto';
import { handleOnClose } from '@/common/utils/dialog';
import { UseContactAddSpouse } from '../[slug]/usePage';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: UseContactAddSpouse;
};

export const DialogAddSpouse = ({ open, onClose, usePageProps }: Props) => {
  const { contactSpouseHookForm } = usePageProps;

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={contactSpouseHookForm.handleSubmit(
        usePageProps.onSubmitAddSpouse
      )}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        Nuevo Conyuge
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '40px' }}
      >
        <Grid container spacing={5} xs={12}>
          <Grid item xs={12} md={12}>
            <AutoCompleteSharedController
              keyId={'spouse_id'}
              keyName={'spouse_id'}
              isLoading={usePageProps.autocompleteContacts.isLoading}
              getOptionLabel={(option: GetContactDto) =>
                `${option.first_name} ${option.last_name}`
              }
              label={'Conyuge'}
              isRequired
              onInputChange={(value) =>
                usePageProps.setContactDescription(value)
              }
              options={
                usePageProps.autocompleteContacts.data
                  ? usePageProps.autocompleteContacts.data.map(
                      (contact: GetContactDto) => ({
                        ...contact,
                        spouse_id: contact.contact_id,
                      })
                    )
                  : []
              }
              hookForm={contactSpouseHookForm}
              labelStyle={{ mb: '10px' }}
              disableClearable={false}
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
