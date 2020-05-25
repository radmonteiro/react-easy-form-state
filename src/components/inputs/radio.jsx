import {FormStateConsumer} from '../../container/form-state-provider.jsx';
import React from 'react';
import {Form} from 'react-bootstrap';
import {Tooltip} from './tooltip.jsx';
import {InvalidFeedback} from './invalid-feedback.jsx';
import {intlMessage} from '../../container/intl-provider-wrapper.jsx';
import {handleInputChange, setFocus} from './functions';

//TODO initialValue
export const SelectRadioInput = ({label, labelText, name, tooltip, tooltipText, catalog, onChange, visible}) => {

    return (

        <>
            <FormStateConsumer name={name} visible={visible}>

                {({state, validation, setState, providerCatalog}) => {

                    React.useEffect( () => {
                        if(! state) {
                            setState('');
                        }
                    }, []);


                    catalog = catalog ?? providerCatalog;

                    const htmlElRef = setFocus(validation);

                    const handleOnChange = handleInputChange(setState, onChange);

                    return (
                        <Form.Group >

                            <Form.Label>{label ? intlMessage(label) : labelText}</Form.Label>

                            <Tooltip tooltip={tooltip} tooltipText={tooltipText} />

                            <div className={'customchecks'} ref={htmlElRef}>
                                {catalog.map(item =>
                                    <div key={name + item.id} className="form-check inline">
                                        <Form.Check
                                            name={name}
                                            type="radio"
                                            value={item.id}
                                            label={item.text}
                                            onChange={handleOnChange}
                                        />

                                    </div>
                                )}

                            </div>

                            <InvalidFeedback validation={validation}/>
                        </Form.Group>
                    )
                }}
            </FormStateConsumer>

        </>


    )
};
