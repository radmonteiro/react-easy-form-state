
export function submitForm({urlSubmit, form, setState, setValidationErrors, handleResponseData, afterHandleResponse, handleServerErrors}) {

    handleResponseData = handleResponseData ??  handleResponseDataDefault({setState, setValidationErrors, afterHandleResponse, handleServerErrors});


    fetch(urlSubmit, {
        method: 'POST',
        body: new FormData(form),
        header: { Accept: 'application/json' },
        credentials: 'same-origin'

    })
        .then(response => {

            if (! response.ok) {
                throwError(handleResponseData);
            }

            return response.json().catch(() => { throwError(handleResponseData); });

        })
        .then(data => { handleResponseData(data) });

}


const handleServerErrorsDefault = data => {

    /**
     * Handle server validation errors
     */
    if(Object.keys(data.errors).length > 0) {

        let focusOnField = true;

        let validationErrors = {};
        Object.keys(data.errors.fields).forEach(el => {
            let val = {
                invalid: true,
                focus: focusOnField,
                errorMessage: data.errors.fields[el]
            }
            focusOnField = false;

            validationErrors[el] = val;
        })

        let globalMessage = data.errors.message;

        delete data.errors;

        return {
            message: globalMessage,
            fields: validationErrors
        }
    }

    return {
        message: '',
        fields: {}
    };

}


export const handleResponseDataDefault = ( {setState, setValidationErrors, afterHandleResponse, handleServerErrors} ) => data => {

    handleServerErrors = handleServerErrors ?? handleServerErrorsDefault;

    if (data.urlRedirect) {
        window.location.href = data.urlRedirect;
        return;
    }

    let serverErrors = handleServerErrors(data);

    setValidationErrors(serverErrors);

    /**
     * Replace state with values sent from server
     */
    setState(prevState => {
        let newState = {
            ...prevState,
            ...data
        }

        afterHandleResponse(newState);

        return newState;

    });

};



function throwError(handleSuccess) {

    handleSuccess({
        errors : {
            errorMessage: 'Error during request'
        }
    });

}
