import {FormStateProvider} from '../../src/container';
import React from 'react';
import {DatePickerInput, SelectInput, TextInput, SelectRadioInput, HiddenInput, CheckboxInput} from '../../src/components/inputs';
import {ButtonSubmit} from '../../src/components/buttons';

import {messages} from '../messages/messages';


/**
 * Exemplo de componente com FormStateProvider
 */


export const SimpleExampleApp = () => {


    const urlSubmit = 'example-url'

    const validateLength = (value) => {
        return value.length > 3;
    };

    const validations =
        [
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                errorMessage: 'Required'
            },
            {
                field: 'name',
                method: validateLength,
                validWhen: true,
                errorMessage: 'Invalid length'
            }
        ];

    const [isAdmin, setIsAdmin] = React.useState(false);

    const onChangeType = value => {
        setIsAdmin(value === 'admin');
    }

    const catalogs = {
        type: [
            {id: 'admin', text: 'Administrator'},
            {id: 'normal', text: 'Normal user'}
        ],
        gender: [
            {id: 'M', text: 'Male'},
            {id: 'F', text: 'Female'}
        ]
    }

    return (

        <>

            <FormStateProvider urlSubmit={urlSubmit} validations={validations} catalogs={catalogs} messages={messages} locale={'en'} dateFormat={'dd/MM/yyyy'}>

                <TextInput label={'input.name'}
                                name={'name'}
                           tooltip={'tooltip.name'}
                />

                <TextInput labelText={'Email'}
                                name={'email'}
                />

                <SelectInput labelText={'Type'}
                                  name={'type'}
                                  onChange={onChangeType}
                />

                <TextInput labelText={'Password'}
                                name={'password'}
                                visible={isAdmin}
                />


                <SelectRadioInput labelText={'Gender'}
                             name={'gender'}

                />


                <DatePickerInput labelText={'Birthday'}
                                 name={'birthday'}

                />

                <HiddenInput name={'birthday'}
                             value={'some hidden value'}
                />



                <CheckboxInput labelText={'Accept conditions'}
                               name={'acceptConditions'}
                />

                <ButtonSubmit labelText={'Submit'} />



            </FormStateProvider>
        </>
    )
};
