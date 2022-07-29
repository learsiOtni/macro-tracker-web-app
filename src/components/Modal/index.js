import React from 'react';
import { Card } from '@mui/material';
import classes from './Modal.module.css';


const Modal = (props) => {

    let modalClass = [classes.Modal];
    if (props.showModal) modalClass.push(classes.Show);

    return (
        <div className={modalClass.join(' ')} onClick={props.onOutsideClick} ref={props.outsideRef}>
            <div className={classes.Content}>
                <Card>
                    <div className={classes.Header}>
                        <h1>{props.title}</h1>
                        <p onClick={props.onClose} className={classes.Close}>&times;</p>
                    </div>

                    {props.children}
                </Card>
            </div>
        </div>
    )
};

export default Modal;