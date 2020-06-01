import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

export const Loader = ({active, text, children}) => {

    return (

        <LoadingOverlay
            active={active}
            spinner
            text={text}
            styles={{
                overlay: (base) => ({
                    ...base,
                    position: 'fixed'
                })
            }}

        >

            {children}

        </LoadingOverlay>
    )
}
