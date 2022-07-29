import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Link = (props) => (

    <li className="link">
        <NavLink
            to={props.to}
            exact={props.exact}
            activeClassName="active-link"
            onClick={props.onClick}
        >
            <span className="icon" >
                {props.icon && <FontAwesomeIcon icon={props.icon} />}
            </span>

            {props.children}
        </NavLink>
    </li>
);

export default Link;