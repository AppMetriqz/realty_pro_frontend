import * as React from 'react';
import { FormHelperText, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ImageIcon from '@/icons/ImageIcon';
import { getHelperTextFormState } from '@/common/utils/formHook';
import { BASE_URL } from '@/config/api/api.config';

const keyId = 'cover';

export const Cover = ({ usePageProps }: { usePageProps: any }) => {
  const { hookForm } = usePageProps;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      hookForm.setValue(keyId, selectedFile);
      hookForm.setValue('cover_path', '');
    }
  };

  return (
    <>
      <Typography mb={'15px'}>
        + Seleccionar Foto de Representacion:
        {getHelperTextFormState(hookForm.formState, keyId).error ? (
          <FormHelperText error={true}>
            {getHelperTextFormState(hookForm.formState, keyId).helperText}
          </FormHelperText>
        ) : null}
      </Typography>
      <Button
        sx={{
          background:
            hookForm.watch(keyId) || !!hookForm.watch('cover_path')
              ? `url(${
                  !!hookForm.watch('cover_path')
                    ? `${BASE_URL}/${hookForm
                        .watch('cover_path')
                        .replaceAll(/[\/\\]/g, `/`)}`
                    : `${URL.createObjectURL(hookForm.watch(keyId))}`
                })`
              : 'rgba(231, 231, 231, 0.25)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          objectFit: 'cover',
          borderRadius: '8px',
          boxShadow: 'none',
          minHeight: '177px',
          border: '1px solid #E7E7E7',
          padding: '54px',
          marginBottom: '30px',
          '&:hover': {
            backgroundColor: 'rgba(231, 231, 231, 0.35)',
          },
        }}
        fullWidth
        variant="contained"
        component="label"
      >
        {hookForm.watch(keyId) || !!hookForm.watch('cover_path') ? null : (
          <ImageIcon />
        )}
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
    </>
  );
};
