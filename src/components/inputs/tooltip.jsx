import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {default as ReactBootstrapTooltip} from 'react-bootstrap/Tooltip';

import '../../css/tooltip.css';
import {intlMessage} from '../../container/intl-provider-wrapper.jsx';

export const Tooltip = ({tooltip, tooltipText}) => {

    const message = tooltip ? intlMessage(tooltip) : tooltipText;

    return (
        <>
            {message && message !== '' && (
                <div className="tooltips">
                    <OverlayTrigger overlay={<ReactBootstrapTooltip id="tooltip-disabled">{message}</ReactBootstrapTooltip>}>
                        <span className="d-inline-block">
                            <FontAwesomeIcon icon={faInfoCircle}/>
                        </span>
                    </OverlayTrigger>

                </div>
            )}
        </>
    )
}
;
