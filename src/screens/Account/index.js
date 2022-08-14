import React, { Component } from 'react';
import axios from '../../axios/axios-foods';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Box, Button, Grid, Typography, Avatar } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ConstructionIcon from '@mui/icons-material/Construction';

import { foodForm } from './foodForm';
import { Form } from '../../components';
import { isFloat } from '../../shared/utility';


class Account extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        
    }


    submitHandler = (state) => {
        
        let newEntry = { qty: 1 };
        Object.entries(state).forEach( ([id, input]) => { 
            newEntry = {...newEntry, [id]: input.value};
        });

        axios.post(`foods.json?auth=${this.props.token}`, newEntry)
            .then(response => {
                console.log(response);
                
                this.props.addAlertMessage({
                    id: `01`,
                    title: "Success",
                    message: `Successfully added the entry to the database!`,
                    severity: 'success',
                    expiryTime: 2000
                })
            })
            .catch(error => {
                console.log(error);
            })
    };

    logoutHandler = () => {
        this.props.onLogout();
    };

    inputRefCheck = () => {
        console.log('here');
        const { current } = this.inputRef;
        if (current && current.name !== 'name') {
            if(!isFloat(current.value)) current.value = '';
        }
    }

    render() {

        return (
            <Box component="main" sx={{ marginLeft: '250px', p: 4, mt: 8 }}>

                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <Button 
                            component="a" 
                            startIcon={<PersonRemoveIcon />} 
                            onClick={this.logoutHandler} 
                            href="/signin"
                        >
                            Logout
                        </Button>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', mb: 10}}>
                        <Typography variant="h6" component="h5">Hello, Daniel</Typography>
                        <Avatar sx={{ml: 2}}>DS</Avatar>
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                        <Typography variant="h1">UNDER CONSTRUCTION</Typography>
                        <ConstructionIcon color="error" sx={{fontSize: '120px'}}/>
                    </Grid>

                    <Grid item>
                        <p>----SHOW users details such as name, macros goal, etc.</p>

                        <p>1) Be able to add own food items to database</p>
                        <p>Input checking + error handling</p>
                        <p>Enter Float numbers e.g. 3.14</p>
                    </Grid>
                </Grid>

        
                <div>
                    <Form
                        formState={foodForm}
                        onSubmit={this.submitHandler}
                        onAuthStart={this.props.onAuthStart}
                        buttonTitle='ADD TO DATABASE'
                        loginFailed={this.props.error}
                        label={{ unit: 'Metric Unit' }}
                        inputRef={this.inputRef}
                        inputRefCheck={this.inputRefCheck}
                        style="foodForm"
                        inputStyle="input"
                    />
                </div>
                

                <p>2) Be able to save favorite list of food items </p>
            </Box>
        );
    };
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Account);