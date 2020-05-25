import React from 'react';
import {Form} from 'react-bootstrap';
import {FormStateConsumer} from '../../container/form-state-provider.jsx';
import {intlMessage} from '../../container/intl-provider-wrapper.jsx';
import {Tooltip} from './tooltip.jsx';
import {InvalidFeedback} from './invalid-feedback.jsx';
import {handleInputChange, setFocus} from './functions.js';

export const HiddenInput = ({name, value}) => {

    return(
        <FormStateConsumer name={name} visible={false}>

            {({state, setState}) => {

                React.useEffect( () => {
                    if(! state) {
                        setState(value);
                    }
                }, []);


                return (
                    <input type="text"
                           name={name} id={name}
                           value={value}
                           disabled={true}
                    />
                )
            }}
        </FormStateConsumer>
    )

};
