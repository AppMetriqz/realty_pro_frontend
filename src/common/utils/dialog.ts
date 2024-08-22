export const handleOnClose = (
  event: {},
  reason: 'backdropClick' | 'escapeKeyDown',
  onClose: (value: boolean) => void
) => {
  if (reason === 'backdropClick') {
    return false;
  }

  if (reason === 'escapeKeyDown') {
    return false;
  }

  if (typeof onClose === 'function') {
    onClose(false);
  }
};
