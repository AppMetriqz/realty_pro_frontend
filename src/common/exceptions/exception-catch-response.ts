import {toast} from "react-toastify";
import _ from "lodash";

export default function ExceptionCatchResponse(error: Error | any) {
    if (_.isUndefined(error.response)) {
        try {
            const message = error.message
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } catch (e: any) {
            // toast.error(error.message, {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "colored",
            // });
        }
    }
}
