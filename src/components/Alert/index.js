import React, { useEffect, useState } from 'react';
import { Alert as MuiAlert, AlertTitle, styled } from '@mui/material';

const AlertMessage = styled(MuiAlert, {
    shouldForwardProp: props => props !== 'show'
})(({show}) => ({
    display: !show && 'none',
    position: 'absolute',
    top: '90%',
    left: '70%'
}))

const Alert = (props) => {

    const [show, setShow] = useState(true)

    useEffect( () => {

        setTimeout( () => setShow(false), 2000);
    }, [props.message])

    return (
        <AlertMessage severity={props.severity} show={show}>
            <AlertTitle>{props.title}</AlertTitle>
            {props.message} — <strong>check it out!</strong>
        </AlertMessage>
    )
}

export default Alert;