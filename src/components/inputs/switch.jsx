import React from 'react';
import {Form} from 'react-bootstrap';
import {FormStateConsumer} from '../../container/form-state-provider.jsx';
import {intlMessage} from '../../container/intl-provider-wrapper.jsx';
import {Tooltip} from './tooltip.jsx';
import {InvalidFeedback} from './invalid-feedback.jsx';
import {handleInputChange, setFocus} from './functions.js';


export const SwitchInput = ({label, labelText, name, tooltip, tooltipText, readOnly, disabled, onChange, initialValue, visible}) => {

    return(
        <FormStateConsumer name={name} visible={visible}>

            {({state, validation, setState}) => {

                React.useEffect( () => {
                    if(! state) {
                        setState(initialValue);
                    }
                }, []);


                const htmlElRef = setFocus(validation);

                const handleOnChange = handleInputChange(setState, onChange);

                return (
                    <Form.Group >
                        <Form.Label>{label ? intlMessage(label) : labelText}</Form.Label>

                        <Tooltip tooltip={tooltip} tooltipText={tooltipText} />

                        <Form.Switch
                            ref={htmlElRef}
                            className={'form-control ' + (validation ? validation.invalid && 'is-invalid' : '')}
                            name={name}
                            id={name}       //o Form.Switch precisa do id para funcionar
                            label={label}
                            onChange={handleOnChange}
                        />

                        <InvalidFeedback validation={validation}/>
                    </Form.Group>
                )
            }}
        </FormStateConsumer>
    )

};

