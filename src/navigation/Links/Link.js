import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = (props) => (

    <li className="link">
        <NavLink
            to={props.to}
            exact={props.exact}
            activeClassName="active-link"
            onClick={props.onClick}
        >
            <span className="icon" >ICON HERE</span>

            {props.children}
        </NavLink>
    </li>
);

export default Link;