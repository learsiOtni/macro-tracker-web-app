import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import { connect } from 'react-redux';
import { initAuth } from '../store/actions';

import Header from './Header';
import Drawer from './Drawer';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';


class RootNavigator extends Component {

    constructor(props) {
        super(props);
        this.props.initAuth();
    }
    
    render() {

        return (
            <BrowserRouter>
                <CssBaseline />

                { this.props.token && <>
                    <Header token={this.props.token} />
                    <Drawer />
                </> }

                { this.props.isAppReady && (
                    !this.props.token ? <AuthNavigator />
                    :
                    <AppNavigator userId={this.props.userId} token={this.props.token} />
                ) }
            </BrowserRouter>
        ) 
    };
};

const mapStateToProps = state => ({ 
    token: state.auth.token, 
    userId: state.auth.userId,
    isAppReady: state.auth.isAppReady,
});

const mapDispatchToProps = dispatch => ({
    initAuth: () => dispatch(initAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps) (RootNavigator);