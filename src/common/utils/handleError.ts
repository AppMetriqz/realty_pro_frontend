import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export const onHandleAlert = (err: AxiosError<{ message: string }>): void => {
  Swal.fire({
    title: 'Error!',
    text: err.response?.data?.message ?? '',
    confirmButtonColor: 'red',
    timer: 5000,
  });
};
