import React from 'react';

const Button = (props) => {

    return (
        <button {...props} className="btn">
            {props.children}
        </button>
    )
};

export default Button;