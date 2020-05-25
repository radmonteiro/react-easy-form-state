import React from 'react';


export const InvalidFeedback = ({validation}) => {
    return <span className="invalid-feedback d-block"> {validation ? validation.errorMessage : ''}</span>
};
