import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Countries } from '@/common/constants';
import { PropertyType, CurrencyType } from '@/common/constants/app-config';
import { ProjectFeatures } from '@/app/(DashboardLayout)/project/components/ProjectFeatures';
import { Cover } from '@/app/(DashboardLayout)/project/components/Cover';
import { TextFieldSharedController } from '@/common/components/UI/textField/TextFieldShared';
import { SelectSharedController } from '@/common/components/UI/textField/SelectShared';
import { AutoCompleteSharedController } from '@/common/components/UI/textField/AutoCompleteShared';
import { handleOnClose } from '@/common/utils/dialog';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  usePageProps: any;
  isEdit?: boolean;
};

export const DialogCreate = ({
  isEdit = false,
  open,
  onClose,
  usePageProps,
}: Props) => {
  const { hookForm } = usePageProps;

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={(e, reason) => handleOnClose(e, reason, onClose)}
      component="form"
      onSubmit={hookForm.handleSubmit(usePageProps.onSubmit)}
    >
      <DialogTitle sx={{ p: '40px' }} fontSize={'21px'}>
        {isEdit ? 'Editar' : 'Nuevo'} Proyecto
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', px: '40px' }}
      >
        <Grid container spacing={5} xs={12}>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Nombre'}
              name={'name'}
              isRequired
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectSharedController
              label={'Tipo de Proyecto'}
              options={PropertyType}
              name={'type'}
              disabled={isEdit}
              isRequired={!isEdit}
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectSharedController
              label={'Moneda'}
              name={'currency_type'}
              disabled={isEdit}
              isRequired={!isEdit}
              options={CurrencyType}
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          {hookForm.watch('type') === 'plot' ? null : (
            <Grid item xs={12} md={6}>
              <TextFieldSharedController
                label={'Cantidad de Niveles'}
                name={'levels_qty'}
                disabled={isEdit}
                isRequired={!isEdit}
                hookForm={hookForm}
                textFieldProps={{ type: 'number' }}
                labelStyle={{ mb: '10px' }}
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <AutoCompleteSharedController
              keyId={'country_code'}
              keyName={'label'}
              label={'Pais'}
              disabled={isEdit}
              isRequired={!isEdit}
              value={Countries.find(
                (country) =>
                  country.country_code === hookForm.watch('country_code')
              )}
              options={Countries}
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Estado / Provincia'}
              name={'state'}
              disabled={isEdit}
              isRequired={!isEdit}
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Ciudad / Delegación'}
              name={'city'}
              disabled={isEdit}
              isRequired={!isEdit}
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Sector'}
              name={'sector'}
              disabled={isEdit}
              isRequired={!isEdit}
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Dirección'}
              name={'address'}
              disabled={isEdit}
              isRequired={!isEdit}
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Latitud(opcional)'}
              name={'latitude'}
              disabled={isEdit}
              isRequired={!isEdit}
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldSharedController
              label={'Longitud(opcional)'}
              name={'longitude'}
              disabled={isEdit}
              isRequired={!isEdit}
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextFieldSharedController
              label={'Descripción'}
              name={'description'}
              isRequired
              hookForm={hookForm}
              labelStyle={{ mb: '10px' }}
              textFieldProps={{
                multiline: true,
                rows: 6,
                fullWidth: true,
              }}
            />
          </Grid>

          <Grid item container xs={12} md={12} spacing={'30px'}>
            <ProjectFeatures usePageProps={usePageProps} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Cover usePageProps={usePageProps} />
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
