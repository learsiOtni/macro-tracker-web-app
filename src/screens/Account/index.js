import React, { Component } from 'react';
import axios from '../../axios/axios-foods';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { foodForm } from './foodForm';
import { Button, Form } from '../../components';
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
                alert('ADDED TO DB');

            })
            .catch(error => {
                console.log(error);
            })
    };

    logoutHandler = () => {
        this.props.onLogout();
        this.props.history.replace({pathname: '/signin'});
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
            <main className="account-page">

                <div>
                    <Button onClick={this.logoutHandler}>Logout</Button>
                </div>
                <div>
                    <p>AccountScreen</p>

                    <p>----SHOW users details such as name, macros goal, etc.</p>

                    <p>1) Be able to add own food items to database</p>
                    <p>Input checking + error handling</p>
                    <p>Enter Float numbers e.g. 3.14</p>
                </div>
                
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
            </main>
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