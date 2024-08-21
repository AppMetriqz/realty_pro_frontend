import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';

interface ModalEliminarProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '12px',
  },
}));

const ModalEliminar = ({
  open,
  title,
  onConfirm,
  onCancel,
}: ModalEliminarProps) => {
  const handleClose = (event: React.MouseEvent, reason: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      onCancel();
    }
  };

  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
      sx={{ padding: '30px', borderRadius: '8px' }}
    >
      <Box sx={{ padding: '15px 30px', borderRadius: '8px' }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onCancel}
              sx={{
                flex: 1,
                color: '#000',
                borderColor: '#000',
                padding: '10px 15px',
                '&:hover': {
                  borderColor: '#000',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              variant="contained"
              color="primary"
              sx={{
                flex: 1,
                backgroundColor: '#9E0B0F',
                padding: '10px 15px',
                '&:hover': { backgroundColor: '#7a0b0c' },
              }}
            >
              Sí, eliminar
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </CustomDialog>
  );
};

export default ModalEliminar;
