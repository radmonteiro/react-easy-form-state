import {FormStateConsumer} from '../../container/form-state-provider.jsx';
import {Button} from 'react-bootstrap';
import {intlMessage} from '../../container/intl-provider-wrapper.jsx';
import React from 'react';

export const ButtonSubmit = ({label, labelText, readOnly, disabled, onClick}) => {

    onClick = onClick ?? ((event) => {});

    return(
        <FormStateConsumer name={'submit'} >

            {() => {

                return (

                    <Button type={'submit'} onClick={onClick}>
                        {label ? intlMessage(label) : labelText}
                    </Button>
                )
            }}
        </FormStateConsumer>
    )

};
