import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import {
  ContactMethodType,
  ContactType,
  MaritalStatusType,
} from '@/common/constants/app-config';
import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { SelectSharedController } from '@/common/components/UI/textField/SelectShared';
import { AutoCompleteSharedController } from '@/common/components/UI/textField/AutoCompleteShared';
import { UseContactCreateUpdateProps } from '../useContactPage';
import { GetContactDto } from '@/common/dto';
import TextMaskCustom from '@/common/components/UI/textMaskCustom/TextMaskCustom';
import { handleOnClose } from '@/common/utils/dialog';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: UseContactCreateUpdateProps;
  isEdit?: boolean;
};

export const DialogCreateUpdateContact = ({
  isEdit = false,
  open,
  onClose,
  usePageProps,
}: Props) => {
  const { contactHookForm } = usePageProps;

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={contactHookForm.handleSubmit(usePageProps.onSubmit)}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        {isEdit ? 'Editar' : 'Nuevo'} Contacto
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '40px' }}
      >
        <Grid container spacing={5} xs={12}>
          <Grid item xs={12} md={6}>
            <AutoCompleteSharedController
              keyId={'spouse_id'}
              keyName={'spouse_id'}
              isLoading={usePageProps.autocompleteContacts.isLoading}
              getOptionLabel={(option: GetContactDto) =>
                `${option.first_name} ${option.last_name}`
              }
              label={'Conyuge:'}
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
              hookForm={contactHookForm}
              labelStyle={{ mb: '15px' }}
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
