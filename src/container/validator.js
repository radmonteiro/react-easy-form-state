import validator from 'validator';


export function validate(state, validations) {

    // start out assuming valid
    let validation = valid(validations);

    let firstError = true;

    // for each validation rule
    validations.forEach(rule => {

        // if the field hasn't already been marked invalid by an earlier rule
        if (! validation[rule.field].invalid) {
            // determine the field value, the method to invoke and optional args from
            // the rule definition
            let field_value = '';

            if (state[rule.field]) {
                field_value = state[rule.field].toString();
            }

            const args = rule.args || [];

            const validation_method = typeof rule.method === 'string' ? validator[rule.method] : rule.method;

            // call the validation_method with the current field value as the first
            // argument, any additional arguments, and the whole state as a final
            // argument.  If the result doesn't match the rule.validWhen property,
            // then modify the validation object for the field and set the valid
            // field to false
            if (validation_method(field_value, ...args, state) !== rule.validWhen) {
                validation.valid = false;

                //atribuir focus=true na primeira validação e nas seguintes focus=false
                validation[rule.field] = {invalid: true, errorMessage: rule.errorMessage, focus: firstError};

                firstError = false;
            }
        }
    });

    return validation;
}

function valid(validations) {
    const validation = {};

    validations.map(rule => (
        validation[rule.field] = { errorMessage: ''}
    ));

    return {valid: true, ...validation};
}
