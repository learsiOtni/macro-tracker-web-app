import React, { useEffect, useState } from 'react';
import AlertMessage from './AlertMessage';
import { styled } from '@mui/material';


const AlertContainer = styled('div')({
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: '30px'
})

const Alert = (props) => {
    return (
        <AlertContainer>
            {
                props.alertMessages && props.alertMessages.map(
                    alertMessage => <AlertMessage 
                        key={alertMessage.id} 
                        alertMessage={alertMessage}
                    />)
            }
        </AlertContainer>
    )
}

export default Alert;