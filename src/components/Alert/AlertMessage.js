import React, { useEffect, useState } from 'react';
import { Alert as MuiAlert, AlertTitle, styled } from '@mui/material';
import { connect } from 'react-redux';
import { removeAlertMessage } from '../../store/actions';

const Alert = styled(MuiAlert)({
    margin: '10px 0'
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


/*

If a user clicks a button, show the message confirmation

problem: if user clicks on multiple buttons, the message should be stacked, 
and disappears individually.
-Also, after a few seconds, the alert messages should become empty.
-(Can show in an activity bar, all the deletes, additions, etc)

PSEUDO CODE



*/ 

const mapDispatchToProps = { removeAlertMessage };

export default connect(null, mapDispatchToProps)(AlertMessage);