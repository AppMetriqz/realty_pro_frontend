import * as React from 'react';
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';
import { GetPropertyFeaturesDto } from '@/common/dto';
import _ from 'lodash';
import { getHelperTextFormState } from '@/common/utils/formHook';

const keyId = 'property_feature_ids';

export const ProjectFeatures = ({ usePageProps }: { usePageProps: any }) => {
  const { hookForm, listProps } = usePageProps;

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = hookForm.getValues(keyId);
    const checked = event.target.checked;
    const id: number = _.toNumber(event.target.id);
    if (checked) {
      hookForm.clearErrors(keyId);
      hookForm.setValue(keyId, _.uniq(_.concat(values, id)));
    } else {
      const removes = _.filter(values, (value) => value !== id);
      hookForm.setValue(keyId, _.uniq(removes));
    }
  };

  if (_.isEmpty(hookForm.getValues('type'))) {
    return null;
  }

  return (
    <>
      <Grid item xs={12} mb={'15px'}>
        <Typography>Caracteristicas:</Typography>
        {getHelperTextFormState(hookForm.formState, keyId).error ? (
          <FormHelperText error={true}>
            {getHelperTextFormState(hookForm.formState, keyId).helperText}
          </FormHelperText>
        ) : null}
      </Grid>
      {listProps.findAllProjectFeatures.isLoading ? (
        <Grid justifyContent={'center'} item xs={12}>
          <CircularProgress sx={{ color: '#000' }} />
        </Grid>
      ) : (
        listProps.findAllProjectFeatures.isSuccess &&
        _.map(
          listProps.findAllProjectFeatures.data.rows,
          (item: GetPropertyFeaturesDto) => (
            <Grid item xs={6} md={4} key={_.uniqueId(item.description)}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={_.includes(
                      hookForm.watch(keyId),
                      item.property_feature_id
                    )}
                    id={_.toString(item.property_feature_id)}
                    onChange={handleCheckbox}
                  />
                }
                label={item.description}
              />
            </Grid>
          )
        )
      )}
    </>
  );
};
