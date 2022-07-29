import React from 'react';
import { styled } from '@mui/material';

const DropdownView = styled('div', {
    shouldForwardProp: props => props !== "show"
})( ({show}) => ({
    display: 'block',
    //position: 'absolute',
    backgroundColor: '#ffe',
    minWidth: '160px',
    boxShadow: ' 0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
}))

const DropdownContent = styled('div', {
    shouldForwardProp: props => props !== "show"
})( ({show}) => ({
    display: show ? 'block' : 'none',
}))
  

const Dropdown = (props) => {
    const contentClass = ["dd-content"], 
        dropdownClass = ["dd"];


    if (props.show) contentClass.push("display-block");
    if (props.className) dropdownClass.push(props.className);

    return (
        <DropdownView show={props.show}>
            <button onClick={props.clicked} className="dd-display" disabled={props.disabled}>
                {props.label}
            </button>

            {/* Hidden Content */}
            <DropdownContent show={props.show}>
                {props.children}
            </DropdownContent>
        </DropdownView>
    )
};

export default Dropdown;