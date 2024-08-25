import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { AutoCompleteSharedController } from '@/common/components/UI/textField/AutoCompleteShared';
import { GetContactDto } from '@/common/dto';
import { handleOnClose } from '@/common/utils/dialog';

type Props = {
  isEdit?: boolean;
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: any;
};

export const DialogCreateSell = ({
  isEdit = false,
  open,
  onClose,
  usePageProps,
}: Props) => {
  const { sellHookForm } = usePageProps;

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={sellHookForm.handleSubmit(usePageProps.onSubmitSell)}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        {isEdit ? 'Editar' : 'Nuevo'}&nbsp;
        {usePageProps.selectedUnits?.length > 0 ? 'Ventas' : 'Venta'}
        &nbsp;
        <span style={{ fontWeight: 600 }}>
          {usePageProps?.selectedUnits && usePageProps.selectedUnits?.length > 0
            ? `(${usePageProps.selectedUnits.length})`
            : null}
        </span>
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '40px' }}
      >
        <Grid container spacing={5} xs={12}>
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
              hookForm={sellHookForm}
              labelStyle={{ mb: '10px' }}
              disableClearable={false}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <AutoCompleteSharedController
              keyId={'seller_id'}
              keyName={'seller_id'}
              isLoading={usePageProps.sellerAutocompleteContacts.isLoading}
              getOptionLabel={(option: GetContactDto) =>
                `${option.first_name} ${option.last_name}`
              }
              label={'Vendedor:'}
              onInputChange={(value) =>
                usePageProps.setSellerDescription(value)
              }
              options={
                usePageProps.sellerAutocompleteContacts.data
                  ? usePageProps.sellerAutocompleteContacts.data.map(
                      (contact: GetContactDto) => ({
                        ...contact,
                        seller_id: contact.contact_id,
                      })
                    )
                  : []
              }
              hookForm={sellHookForm}
              labelStyle={{ mb: '10px' }}
              disableClearable={false}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Comisión:'}
              name={'commission'}
              hookForm={sellHookForm}
              textFieldProps={{
                type: 'number',
                InputProps: { endAdornment: '%' },
              }}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldSharedController
              label={'Nota:'}
              name={'notes'}
              hookForm={sellHookForm}
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
