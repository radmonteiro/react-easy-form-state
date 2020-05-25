import React from 'react';
import {IntlProvider, useIntl} from 'react-intl';



export const intlMessage = (messageId) =>{
    const intl = useIntl();

    return intl.formatMessage({id: messageId})
};


export const intlFormatMessage = (intl, messageId) =>{
    return intl.formatMessage({id: messageId})
};



export const IntlProviderWrapper = ({ locale, messages, children}) => {

    return (

        <IntlProvider locale={locale}
                      messages={messages[locale]}
                      defaultLocale='en'>

            {children}

        </IntlProvider>
    )
}


