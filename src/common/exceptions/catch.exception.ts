const catchExceptionError = (error: any) => {
    const apiError = error?.response?.data ?? null

    let message = error.message
    let status = 400

    if (apiError) {
        status = apiError.status
        message = apiError.message
    }
    return {
        isOk: false,
        message: message,
        status: status,
    };
}

export default catchExceptionError
