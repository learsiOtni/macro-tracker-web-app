import React, { Component, useEffect } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import { connect } from 'react-redux';
import { initAuth, initFoodBaseValues, initFav, initMacros} from '../store/actions';

import { 
    Account, Overview, Search, Home, 
    Signin, Signup
} from '../screens';
import Header from './Header';
import Drawer from './Drawer';

class RootNavigator extends Component {

    constructor(props) {
        super(props);
        this.props.initAuth();
        this.props.initFoodBaseValues();
    }
    
    render() {
        if (this.props.userId) {
            this.props.initFav(this.props.userId, this.props.token);
            this.props.initMacros(this.props.userId, this.props.token);
        };
        
        const foodBase = Object.values(this.props.foodBaseValues);
        return (
            <BrowserRouter>
                <CssBaseline />
                
                    {this.props.token && foodBase.length > 0 ?
                        <>
                            <Header token={this.props.token} />
                            <Drawer />

                            <Routes>
                                <Route path="/account" element={<Account />} />
                                <Route path="/overview" element={<Overview />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/" element={<Home />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes> 
                        </>
                        :
                        <Routes>
                            <Route path="/signup" element={<Signup/>} />
                            <Route path="/signin" element={<Signin/>} />
                            <Route path="*" element={<Navigate to="/signin" replace />} />
                        </Routes>
                    }

            </BrowserRouter>
        );
    };
};

const mapStateToProps = state => ({ 
    token: state.auth.token, 
    userId: state.auth.userId,
    foodBaseValues: state.foods.foodBaseValues,
});

const mapDispatchToProps = dispatch =>
    ({
        initAuth: () => dispatch( initAuth() ),
        initFoodBaseValues: () => dispatch( initFoodBaseValues()),
        initFav: (userId, token) => dispatch( initFav(userId, token)),
        initMacros: (userId, token) => dispatch( initMacros(userId, token)),
    });

export default connect(mapStateToProps, mapDispatchToProps) (RootNavigator);