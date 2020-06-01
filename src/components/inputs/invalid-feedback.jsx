import React from 'react';


export const InvalidFeedback = ( {validation} ) =>
    <span className="invalid-feedback d-block"> {validation ? validation.errorMessage : ''}</span>

