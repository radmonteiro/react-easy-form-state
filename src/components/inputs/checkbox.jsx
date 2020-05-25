import React from 'react';
import {Form} from 'react-bootstrap';
import {FormStateConsumer} from '../../container/form-state-provider.jsx';
import {intlMessage} from '../../container/intl-provider-wrapper.jsx';
import {Tooltip} from './tooltip.jsx';
import {InvalidFeedback} from './invalid-feedback.jsx';
import {setFocus} from './functions.js';
import {handleInputCheckboxChange} from './functions';

export const CheckboxInput = ({label, labelText, name, tooltip, tooltipText, readOnly, disabled, onChange, initialValue, visible}) => {

    return(
        <FormStateConsumer name={name} visible={visible}>

            {({state, validation, setState}) => {

                React.useEffect( () => {
                    if(! state) {
                        setState(initialValue);
                    }
                }, []);


                const htmlElRef = setFocus(validation);

                const handleOnChange = handleInputCheckboxChange(setState, onChange);

                return (
                    <Form.Group >

                        {/*TODO usar o Form.Check do react-bootstrap */}
                        <input type="checkbox" ref={htmlElRef} className={'form-control ' + (validation ? validation.invalid && 'is-invalid' : '')}
                               name={name} id={name}
                               value={state ?? ''}
                               onChange={handleOnChange}
                               readOnly={readOnly}
                               disabled={disabled}
                               style={{
                                   display: 'inline-block',
                                   verticalAlign: 'middle',
                                   marginRight: '5px'
                               }}
                        />
                        <Form.Label  >
                            {label ? intlMessage(label) : labelText}
                        </Form.Label>

                        <Tooltip tooltip={tooltip} tooltipText={tooltipText} />

                        <InvalidFeedback validation={validation}/>
                    </Form.Group>
                )
            }}
        </FormStateConsumer>
    )

};
