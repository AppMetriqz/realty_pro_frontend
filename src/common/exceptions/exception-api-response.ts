import { toast, } from 'react-toastify';
import _ from "lodash";

export default function ExceptionApiResponse(error: Error | any) {
  try {
    const Exception = error.response.data
    let alertColor:any = "error"
    const message = Exception.message
    const statusCode = _.toString(Exception.statusCode)

    if (_.startsWith(statusCode, '4')) {
      alertColor = "warn"
    }
    if (_.startsWith(statusCode, '5')) {
      alertColor = "error"
    }

    // @ts-ignore
    toast[alertColor](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  } catch (e:any) {
    toast.error(error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
}
