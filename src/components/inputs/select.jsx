import React from 'react';
import {Form} from 'react-bootstrap';
import {FormStateConsumer} from '../../container/form-state-provider.jsx';
import {intlMessage} from '../../container/intl-provider-wrapper.jsx';
import {Tooltip} from './tooltip.jsx';
import {InvalidFeedback} from './invalid-feedback.jsx';
import {handleInputChange, setFocus} from './functions';

export const SelectInput = ({label, labelText, name, placeholder, tooltip, tooltipText, disabled, onChange, catalog, initialValue, visible}) => {

    return (
        <>
            <FormStateConsumer name={name} visible={visible}>

                {({state, validation, setState, providerCatalog}) => {

                    React.useEffect( () => {
                        if(! state) {
                            setState(initialValue);
                        }
                    }, []);

                    catalog = catalog ?? providerCatalog;

                    const htmlElRef = setFocus(validation);

                    const handleOnChange = handleInputChange(setState, onChange);

                    return (
                        <Form.Group >

                            <Form.Label>{label ? intlMessage(label) : labelText}</Form.Label>

                            <Tooltip tooltip={tooltip} tooltipText={tooltipText} />

                            <select ref={htmlElRef}
                                    className={'form-control ' + (validation ? validation.invalid && 'is-invalid' : '')}
                                    name={name} id={name}
                                    onChange={handleOnChange}
                                    value={state ??  ''}
                                    disabled={disabled}
                            >

                                <option value=''>{placeholder ?? '-Select-'}</option>

                                {catalog.map(item =>
                                    <option key={state + item.id} value={item.id}>
                                        {item.text}
                                    </option>
                                )}

                            </select>

                            <InvalidFeedback validation={validation}/>
                        </Form.Group>
                    )
                }}
            </FormStateConsumer>

        </>
    );

};
