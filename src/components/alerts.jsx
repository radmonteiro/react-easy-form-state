import React from 'react';


export const AlertSuccess = ({message}) => {
    return (
        <div className={'alert alert-success'} role="alert">{message}</div>
    );
};


export const AlertError = ({message}) => {
    return (
        <div className={'alert alert-danger'} role="alert">{message}</div>
    );
};



