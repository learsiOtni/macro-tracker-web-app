import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { initFoodBaseValues, initFav, initMacros} from '../store/actions';

import { Account, Overview, Search, Home, } from '../screens';


const AppNavigator = (props) => {

    useEffect( () => {
        props.initFoodBaseValues();
        props.initFav(props.userId, props.token);
        props.initMacros(props.userId, props.token);
    }, []);

    const foodBase = Object.values(props.foodBaseValues);
    if(foodBase.length > 0) return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={ <Navigate to="/" replace />} />
        </Routes>
    )
    
    return <p>LOADING....</p>
}

const mapStateToProps = state => ({ 
    foodBaseValues: state.foods.foodBaseValues,
});

const mapDispatchToProps = dispatch =>
    ({
        initFoodBaseValues: () => dispatch( initFoodBaseValues()),
        initFav: (userId, token) => dispatch( initFav(userId, token)),
        initMacros: (userId, token) => dispatch( initMacros(userId, token)),
    });

export default connect(mapStateToProps, mapDispatchToProps) (AppNavigator);