import React, { Component } from 'react';
import { Modal, Form } from '..';

import { Button, Typography, Container } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import { macrosForm } from './macrosForm';

class MacrosModal extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.outsideRef = React.createRef();
        this.state = { showModal: false };

        this.formSubmitted = this.formSubmitted.bind(this);
        this.modalToggled = this.modalToggled.bind(this);
        this.outsideClicked = this.outsideClicked.bind(this);
    };

    formSubmitted = (macros) => {
        let newEntry = {}, macrosArray = Object.entries(macros);

        if (macrosArray.length > 0) {
            macrosArray.forEach( ([key, input]) => {
                newEntry = {...newEntry, [key]: input.value }
            });

            this.props.onSubmit(newEntry);
        }
        this.setState({ ...this.state, showModal: false});
    };

    modalToggled = () => {
        // fill the form with current macros value
        this.props.macros && Object.keys(macrosForm).forEach( key => {
            if (this.props.macros[key]) macrosForm[key].value = this.props.macros[key];
        });

        this.setState({ ...this.state, showModal: !this.state.showModal})
    };

    outsideClicked = (event) => {
        if (this.outsideRef && this.outsideRef.current === event.target) {
            this.setState({ ...this.state, showModal: false})
        }
    }

    render() {
        return (
            <React.Fragment>
                <Button color={this.props.color} variant="contained" onClick={this.modalToggled} startIcon={<ChangeCircleIcon />}>
                    {this.props.macros ? `CHANGE MACROS GOALS` : `ADD MACROS GOALS` }
                </Button>

                {this.state.showModal && <Modal
                    showModal={this.state.showModal}
                    title='My Macro'
                    onClose={this.modalToggled}
                    outsideRef={this.outsideRef}
                    onOutsideClick={this.outsideClicked}
                >
                    <Container>
                        <Typography variant="h6" sx={{ pt: 2}}>Go on a macros calculator, and enter the details here to start tracking your macros.</Typography>

                        <Form
                            formState={macrosForm}
                            buttonTitle={this.props.macros ? `UPDATE MACROS` : `ADD MACROS`}
                            onSubmit={this.formSubmitted}
                            inputRef={this.inputRef}
                            activateClear
                        />
                    </Container>
                </Modal>
                }
            </React.Fragment>
        );
    }
};

export default MacrosModal;