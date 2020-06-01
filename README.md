
With react-easy-form-state you can easily create a form with everything you need:
* field validation
* internationalization
* server submition with response handling and errors handling 
 

Example with Spring Boot server in https://github.com/radmonteiro/ReactEasyFormStateExample

Simple form example in https://codesandbox.io/s/react-easy-form-state-example-br5gj

 
# Container
## FormStateProvider
```react
<FormStateProvider validations={validations} 
                   catalogs={catalogs} 
                   messages={messages} 
                   locale={'en'} 
                   dateFormat={'dd/MM/yyyy'} 
>

    ...

</FormStateProvider>
```

| Property           | Type     | Description                                                                                                                                                                                                                                                                                       |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initialState       | { }      | If you want to give intial values for the fields.                                                                                                                                                                                                                                                 |
| catalogs           | { }      | Object with catalogs for **SelectInput** and                                                                                                                                                                                                                                                      |
| messages           | { }      | Object for internationalization.                                                                                                                                                                                                                                                                  |
| locale             | string   | Locale to select the **messages** we want.                                                                                                                                                                                                                                                        |
| validations        | [ ]      | Validation for 'validator' dependency.                                                                                                                                                                                                                                                            |
| urlSubmit          | string   | Url to submit form data.                                                                                                                                                                                                                                                                          |
| dateFormat         | string   | Date format for datepickers (default is 'yyyy-MM-dd').                                                                                                                                                                                                                                            |
| successMessage     | string   | Alert message for valid submission (default is 'Success').                                                                                                                                                                                                                                        |
| loaderMsg          | string   | Message for loader.                                                                                                                                                                                                                                                                               |
| hideSubmitAlerts   | boolean  | If you do not want alerts with success or error messages after submit.                                                                                                                                                                                                                            |
| hideLoader         | boolean  | If you do not want an overlay loader.                                                                                                                                                                                                                                                             |
| handleNewState     | function | If you need to handle the state after server response.                                                                                                                                                                                                                                            |
| handleServerErrors | function | If your server responds with errors in a different format than it is handled by this container, you should provide this function to convert your server errors in an object with the structure { message: \<STRING>, fields: {invalid: \<BOOLEAN>, focus: \<BOOLEAN>, errorMessage: \<STRING>} }. |
| onSubmit           | function | Overrides the **FormStateProvider** onSubmit function.                                                                                                                                                                                                                                            |

Properties **messages** and **locale** are optional. You don't need to use these if you do not want internationalization, then when you call Input components from this lib you need to use **labelText** and **tooltipText**. If you want internationalization use **label** and **tooltip**.

The default **handleServerErrors** function can read the errors in server response if the data object has the following structure: 
```json
{
    errors: {
        errorMessage : <STRING>, 
        fields : { 
            <FIELD_NAME>: <STRING>, 
            ...
        }
    }
}
```

For example: 
```json
{
    errors: {
        errorMessage : 'Please correct field errors', 
        fields : { 
            email: 'Invalid email'
            password: 'Password is not strong'
        }
    }
}
```
handleServerErrors default function:
```react
handleServerErrorsDefault = data => {

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


        delete data.errors;

        return {
            message: data.errors.message,
            fields: validationErrors
        }
    }

    return {
        message: '',
        fields: {}
    };

}
```

 
# Components

## ButtonSubmit
```react
<ButtonSubmit labelText={'Submit'} />
```
### Required properties: 
* **label** or **labelText**


| Property  | Type     | Description                                                                                                                                                                                     |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label     | string   | Button label message id.                                                                                                                                                                        |
| labelText | string   | Button label in text.                                                                                                                                                                           |
| readOnly  | boolean  | Defines HTML \<input> readonly attribute.                                                                                                                                                       |
| disabled  | boolean  | Defines HTML \<input> disabled attribute.                                                                                                                                                       |
| onClick   | function | Handler function called before form submission. Optional, only if you need some customized handling. If you need to override the form onSubmit use **FormStateProvider** **onSubmit** property. |



 
 
## TextInput
```react
<TextInput labelText={'Name'}
           name={'name'}
/>
```
### Required properties: 
* **name**
* **label** or **labelText**

| Property     | Type     | Description                                                                                   |
| ------------ | -------- | --------------------------------------------------------------------------------------------- |
| name         | string   | Input name, this will be the property name in the state.                                      |
| label        | string   | Field label message id. Use this instead of **labelText** when you want internationalization. |
| labelText    | string   | Field label in text. Use this instead of **label** if you do not want internationalization.   |
| placeholder  | string   | Input placeholder.                                                                            |
| tooltip      | string   | Tooltip message id. Use this instead of **tooltipText** when you want internationalization.   |
| tooltipText  | string   | Tooltip text. Use this instead of **tooltip** if you do not want internationalization.        |
| readOnly     | boolean  | Defines HTML \<input> readonly attribute.                                                     |
| disabled     | boolean  | Defines HTML \<input> disabled attribute.                                                     |
| onChange     | function | If you need extra handling besides setting state to the form state.                           |
| initialValue | string   | Initial field value.                                                                          |
| visible      | boolean  | False to hide this input. Default value is true.                                              |



## SelectInput
```react
<SelectInput labelText={'Type'}
             name={'type'}
/>
```
### Required properties: 
* **name**
* **label** or **labelText**
* **catalog**:  required if it was not passed in the **catalogs** property of the **FormStateProvider**


| Property     | Type                           | Description                                                                                                       |
| ------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| label        | string                         | Field label message id. Use this instead of **labelText** when you want internationalization.                     |
| labelText    | string                         | Field label in text. Use this instead of **label** if you do not want internationalization.                       |
| name         | string                         | Input name, this will be the property name in the state.                                                          |
| tooltip      | string                         | Tooltip message id. Use this instead of **tooltipText** when you want internationalization.                       |
| tooltipText  | string                         | Tooltip text. Use this instead of **tooltip** if you do not want internationalization.                            |
| tooltipText  | string                         | Tooltip text.                                                                                                     |
| disabled     | boolean                        | Defines HTML \<input> disabled attribute.                                                                         |
| onChange     | function                       | If you need extra handling besides setting state to the form state.                                               |
| catalog      | [ {id: '', text: ''}, ... ]    | Dropdown options. If you passed the catalog in **FormStateProvider** **catalogs** property, this is not required. |
| initialValue | string (**catalog** option id) | Initial value.                                                                                                    |
| visible      | boolean                        | False to hide this input. Default value is true.                                                                  |




## SelectRadioInput
```react
<SelectRadioInput labelText={'Gender'}
                  name={'gender'}
/>
```
### Required properties: 
* **name**
* **label** or **labelText**
* **catalog**:  required if it was not passed in the **catalogs** property of the **FormStateProvider**



| Property    | Type                        | Description                                                                                                    |
| ----------- | --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| label       | string                      | Field label message id. Use this instead of **labelText** when you want internationalization.                  |
| labelText   | string                      | Field label in text. Use this instead of **label** if you do not want internationalization.                    |
| name        | string                      | Input name, this will be the property name in the state.                                                       |
| tooltip     | string                      | Tooltip message id. Use this instead of **tooltipText** when you want internationalization.                    |
| tooltipText | string                      | Tooltip text. Use this instead of **tooltip** if you do not want internationalization.                         |
| catalog     | [ {id: '', text: ''}, ... ] | Radio options. If you passed the catalog in **FormStateProvider** **catalogs** property, this is not required. |
| onChange    | function                    | If you need extra handling besides setting state to the form state.                                            |
| visible     | boolean                     | False to hide this input. Default value is true.                                                               |






## DatePickerInput
```react
<DatePickerInput labelText={'Birthday'}
                 name={'birthday'}
/>
```

### Required properties: 
* **name**
* **label** or **labelText**


| Property    | Type     | Description                                                                                   |
| ----------- | -------- | --------------------------------------------------------------------------------------------- |
| label       | string   | Field label message id. Use this instead of **labelText** when you want internationalization. |
| labelText   | string   | Field label in text. Use this instead of **label** if you do not want internationalization.   |
| name        | string   | Input name, this will be the property name in the state.                                      |
| tooltip     | string   | Tooltip message id. Use this instead of **tooltipText** when you want internationalization.   |
| tooltipText | string   | Tooltip text. Use this instead of **tooltip** if you do not want internationalization.        |
| onChange    | function | If you need extra handling besides setting state to the form state.                           |
| visible     | boolean  | False to hide this input. Default value is true.                                              |




## HiddenInput
```react
<HiddenInput name={'some'}
             value={'someValue'}
/>
```

### Required properties: 
* **name**
* **value**


| Property | Type   | Description                                              |
| -------- | ------ | -------------------------------------------------------- |
| name     | string | Input name, this will be the property name in the state. |
| value    | any    | Input value form data.                                   |



# Example
```react
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

```