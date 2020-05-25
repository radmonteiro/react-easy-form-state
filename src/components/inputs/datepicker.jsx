import {Form} from 'react-bootstrap';
import {intlMessage} from '../../container/intl-provider-wrapper.jsx';
import {FormStateConsumer} from '../../container/form-state-provider.jsx';
import React from 'react';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import DatePicker from 'react-datepicker';
import MaskedInput from 'react-text-mask';
import {setFocus} from './functions';
import {InvalidFeedback} from './invalid-feedback.jsx';
import {Tooltip} from './tooltip.jsx';


import 'react-datepicker/dist/react-datepicker.css';
import '../../css/datepicker.css'

//TODO placeholder
const DatePickerField = ({name, onChange, placeholder, visible}) => {

    onChange = ((value) => {});

    return (
        <>
            <FormStateConsumer name={name} visible={visible}>

                {({state, validation, setState, datePack}) => {

                    React.useEffect( () => {
                        if(! state) {
                            setState('');
                        }
                    }, []);


                    const autoCorrectedDatePipe = createAutoCorrectedDatePipe(datePack.dateFormat);

                    const htmlElRef = setFocus(validation);

                    const handleInputChange = date => {
                        setState(date);
                        onChange(date);
                    };

                    return (
                        <>
                            <DatePicker ref={htmlElRef}
                                        name={name} id={name}
                                        selected={state}
                                        onChange={handleInputChange}
                                        dateFormat={datePack.dateFormat}
                                        customInput={
                                            <MaskedInput
                                                pipe={autoCorrectedDatePipe}
                                                mask={datePack.mask}
                                                keepCharPositions= {true}
                                                guide = {true}
                                            />

                                        }
                            />

                            <InvalidFeedback validation={validation} />
                        </>

                    )
                }}
            </FormStateConsumer>


        </>



    );
};

//TODO initialValue
//TODO placeholder
export const DatePickerInput = ({label, labelText, name, tooltip, tooltipText, onChange, visible}) => {

    let component = <> </>

    if(visible === undefined || visible) {
        component = (
            <Form.Group>

                <Form.Label>{label ? intlMessage(label) : labelText}</Form.Label>

                <Tooltip tooltip={tooltip} tooltipText={tooltipText} />

                <DatePickerField name={name}
                                  onChange={onChange}
                                  visible={visible}
                />

            </Form.Group>
        )
    }
    else {

        component = <DatePickerField name={name}
                                      onChange={onChange}
                                      visible={visible}
        />
    }


    return (
        component
    );
};

