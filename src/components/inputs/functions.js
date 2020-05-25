import React from 'react';


export const setFocus = (validation) => {

    const htmlElRef = React.useRef(null);

    React.useEffect(() => {
        if(validation) {
            if (validation.focus === true){
                if(htmlElRef.current) {
                    htmlElRef.current.focus();
                }
            }
        }

    },[validation]);

    return htmlElRef;
};



export const handleInputChange = (setState, onChange = ((value) => {}) ) => {

    return (e) => {

        let newValue = e.currentTarget.value;

        setState(newValue);
        onChange(newValue);
    };

}


export const handleInputCheckboxChange = (setState, onChange = ((value) => {}) ) => {

    return (e) => {

        let newValue = e.currentTarget.checked;

        setState(newValue);
        onChange(newValue);
    };

}
