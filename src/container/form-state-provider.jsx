import React from 'react'
import { validate } from './validator'
import { submitForm } from './submit'
import {AlertError, AlertSuccess} from '../components/alerts.jsx'
import { usePrevious } from '../components/hooks.jsx'
import {IntlProviderWrapper} from './intl-provider-wrapper.jsx';
import {Loader} from './loader.jsx';

const FormStateContainerContext = React.createContext({})



const createDatePack = dateFormat => {

    dateFormat = dateFormat ?? 'yyyy-MM-dd';

    let mask = [];

    for (let i = 0; i < dateFormat.length; i++) {
        if (dateFormat.charAt(i).match(/[^0-9a-z]/i)) {
            mask.push(/\d/);
        }
        else {
            mask.push(dateFormat.charAt(i));
        }
    }

    return {
        dateFormat: dateFormat,
        mask: mask
    };
}


const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;


export const FormStateProvider = ({
                                      initialContainerState,
                                      urlSubmit,
                                      handleNewState,
                                      validations,
                                      onSubmit,
                                      catalogs,
                                      hideSubmitAlerts,
                                      hideLoader,
                                      loaderMsg,
                                      locale,
                                      messages,
                                      dateFormat,
                                      successMessage,
                                      handleResponseData,
                                      handleServerErrors,
                                      children
                                  }) => {

    const [state, setState] = React.useState({
        ...initialContainerState
    })

    const datePack = createDatePack(dateFormat);

    successMessage = successMessage ?? 'Success';

    const [validationErrors, setValidationErrors] = React.useState({
        message: '',
        fields : {}
    })

    const [alert, setAlert] = React.useState('');

    const [submitted, setSubmitted] = React.useState(false)
    const prevSubmitted = usePrevious(submitted);

    handleNewState = handleNewState ?? (() => {});

    onSubmit = onSubmit ?? ( (event) => {

        setSubmitted(true);

        /*
         * Prevents page refresh
         */
        event.preventDefault();



        /**
         * Validate form
         */
        const validation = validate(state, validations);

        if(validation.valid) {
            setValidationErrors({
                message: '',
                fields: {}
            });
        }
        else {
            setValidationErrors({
                message: 'Field errors',
                fields: validation
            });

            setSubmitted(false);
            return;
        }


        const afterHandleResponse = (state) => {
            setSubmitted(false);
            handleNewState(state);
        }

        submitForm({urlSubmit, form: event.target, setState, setValidationErrors, handleResponseData, afterHandleResponse, handleServerErrors});

    });


    React.useEffect(() => {

        if(prevSubmitted && ! submitted) {
            if(validationErrors.message === '' && Object.keys(validationErrors.fields).length === 0) {
                setAlert(<AlertSuccess message={successMessage} /> );
            }
        }

    }, [submitted])



    React.useEffect(() => {

        let alert = null;

        if(validationErrors.message) {
            alert = <AlertError message={validationErrors.message} />;
        }

        setAlert(alert);

    }, [validationErrors.message])



    const setPropState = name => value => {
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }


    return (
        <FormStateContainerContext.Provider value={ { containerState: state,
            containerValidations: validationErrors.fields ?? {},
            setPropState,
            catalogs,
            datePack

        }}>


            <ConditionalWrapper
                condition={!! locale && !! messages}
                wrapper={children => <IntlProviderWrapper locale={locale} messages={messages}> {children} </IntlProviderWrapper> }
            >


                <ConditionalWrapper
                    condition={ ! hideLoader}
                    wrapper={children => <Loader active={submitted} text={loaderMsg ?? 'Submitting...'}> {children} </Loader> }
                >


                    {! hideSubmitAlerts && alert}

                    <form onSubmit={onSubmit}>

                        {children}

                    </form>



                </ConditionalWrapper>


            </ConditionalWrapper>


        </FormStateContainerContext.Provider>
    )
}



export const FormStateConsumer = ({ name, visible, children }) => {

    const contextValue = React.useContext(FormStateContainerContext);

    if (contextValue === null) {
        throw new Error('FormStateConsumer can only be used as (sub)child of FormStateProvider');
    }

    const { containerState, containerValidations, setPropState, submit, catalogs, datePack } = contextValue;

    const state = containerState[name];
    const validation = containerValidations[name];
    const setState = setPropState(name);

    const providerCatalog = catalogs ? catalogs[name] : [];


    if(visible === undefined || visible){

        return children({ state, validation, setState, submit, providerCatalog, datePack })
    }
    else {
        delete containerState[name];
        delete containerValidations[name]

        return <></>;
    }


}


export const formStateContainer = () => {
    return React.useContext(FormStateContainerContext);
}

