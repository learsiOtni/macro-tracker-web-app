import React, { useEffect, useState } from 'react';
import { Alert as MuiAlert, AlertTitle, styled } from '@mui/material';
import { connect } from 'react-redux';
import { removeAlertMessage } from '../../store/actions';

const Alert = styled(MuiAlert)({
    margin: '10px 0',
    zIndex: 1000,
})

const AlertMessage = (props) => {

    const { id, severity, title, message, expiryTime } = props.alertMessage;

    useEffect(() => {
        setTimeout(() => {
            props.removeAlertMessage(id);
        }, expiryTime);
    }, [])

    return (
        <Alert severity={severity}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    )
}

const mapDispatchToProps = { removeAlertMessage };

export default connect(null, mapDispatchToProps)(AlertMessage);